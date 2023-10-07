import {
  computed, ComputedRef, ref, Ref,
} from 'vue';
import {
  Attachment, AttachmentsFilters, AttachmentsGroup, AttachmentStat,
} from '@/attachments/types';
import { useAttachmentsStore } from '@/attachments/stores/attachments';
import { getFilteredRecords } from '@/database/criteria';
import {
  getAttachmentConsCriterion,
  getAttachmentGameCriterion,
  getAttachmentProsCriterion,
  getAttachmentSearchCriterion,
} from '@/attachments/composables/criteria';
import { SearchResult } from '@/search/types';
import { storage } from '@/storage';

function getUniqueStats(stats: AttachmentStat[]): AttachmentStat[] {
  const unique: AttachmentStat[] = [];

  stats.forEach((stat: AttachmentStat) => {
    if (unique.indexOf(stat) === -1) {
      unique.push(stat);
    }
  });

  return unique;
}

export function useAttachmentsGroups(ids: ComputedRef<string[]>): { groups: ComputedRef<AttachmentsGroup[]> } {
  const attachmentsStore = useAttachmentsStore();

  const ungroupped: ComputedRef<Attachment[]> = computed(() => {
    if (!ids.value.length) {
      return [];
    }

    return attachmentsStore.extendedAttachments.filter((attachment: Attachment) => ids.value.indexOf(attachment.id) !== -1);
  });

  const groups: ComputedRef<AttachmentsGroup[]> = computed(() => {
    if (!ungroupped.value.length) {
      return [];
    }

    const items: AttachmentsGroup[] = [];
    const indexes: any = {};

    ungroupped.value.forEach((attachment: Attachment) => {
      if (!attachment.category || !attachment.category.id) {
        return;
      } else if (typeof indexes[attachment.category.id] !== 'undefined') {
        items[indexes[attachment.category.id]].attachments.push(attachment);

        return;
      }

      indexes[attachment.category.id] = items.push({
        category: attachment.category,
        attachments: [attachment],
      }) - 1;
    });

    return items.sort((a, b) => a.category.sorting - b.category.sorting);
  });

  return { groups };
}

export function useCategoryAttachments(groups: ComputedRef<AttachmentsGroup[]>) {
  const category: Ref<string | null> = ref(groups.value.length > 0 ? groups.value[0].category.id : null);
  const group: ComputedRef<AttachmentsGroup | null> = computed(() => {
    if (!category.value) {
      return null;
    }

    const index = groups.value.findIndex((item: AttachmentsGroup) => item.category.id === category.value);

    if (index === -1) {
      return null;
    }

    return groups.value[index];
  });

  let watcher: null | (() => void) = null;

  const setCategory = (id: string) => {
    category.value = id;

    if (typeof watcher === 'function') {
      watcher();
    }
  };

  const watchForCategory = (callback: () => void) => {
    watcher = callback;
  };

  return {
    category,
    group,
    setCategory,
    watchForCategory,
  };
}

export function useFilteredAttachments(group: ComputedRef<AttachmentsGroup | null>, filterByGame = true) {
  const filters: Ref<AttachmentsFilters> = ref({
    search: '',
    pros: [],
    prosMode: 'or',
    matchAllPros: false,
    cons: [],
    consMode: 'or',
    matchAllCons: false,
    game_id: storage.get('game_id') || null,
  });

  const pros: ComputedRef<AttachmentStat[]> = computed(() => {
    if (!group.value || !group.value?.attachments.length) {
      return [];
    }

    return getUniqueStats(
      group.value?.attachments.flatMap((attachment: Attachment) => attachment.stats?.pros || []),
    );
  });

  const cons: ComputedRef<AttachmentStat[]> = computed(() => {
    if (!group.value || !group.value?.attachments.length) {
      return [];
    }

    return getUniqueStats(
      group.value?.attachments.flatMap((attachment: Attachment) => attachment.stats?.cons || []),
    );
  });

  const hasFilters: ComputedRef<boolean> = computed(() => !!filters.value.search || !!filters.value.game_id || !!filters.value.pros.length || !!filters.value.cons.length);

  const attachments: ComputedRef<Attachment[]> = computed(() => {
    if (!hasFilters.value) {
      return group.value?.attachments || [];
    }

    const criteria = [];

    if (filterByGame) {
      criteria.push(getAttachmentGameCriterion(filters.value.game_id));
    }

    return getFilteredRecords(group.value?.attachments || [], [
      ...criteria,
      getAttachmentProsCriterion(filters.value.pros, filters.value.matchAllPros),
      getAttachmentConsCriterion(filters.value.cons, filters.value.matchAllCons),
      getAttachmentSearchCriterion(filters.value.search),
    ]);
  });

  const reset = (resetGameId = true): void => {
    filters.value.search = '';
    filters.value.pros = [];
    filters.value.cons = [];

    if (resetGameId) {
      filters.value.game_id = null;
      storage.set('game_id', null);
    }
  };

  return {
    filters,
    hasFilters,
    reset,
    pros,
    cons,
    attachments,
  };
}

export function useAttachment(id: ComputedRef<string | null>): { attachment: ComputedRef<Attachment | null> } {
  const attachmentsStore = useAttachmentsStore();
  const attachment = computed(() => {
    if (!id.value) {
      return null;
    }

    const index = attachmentsStore.extendedAttachments.findIndex((item: Attachment) => item.id === id.value);

    if (index === -1) {
      return null;
    }

    return attachmentsStore.extendedAttachments[index];
  });

  return { attachment };
}

export function useAttachmentRoutes(attachment: ComputedRef<Attachment>) {
  const categoryRoute = computed(() => ({
    name: 'attachments.index',
    params: {
      categoryId: attachment.value.category ? attachment.value.category.id : attachment.value.category_id,
    },
  }));

  const attachmentRoute = computed(() => ({
    name: 'attachments.show',
    params: {
      categoryId: attachment.value.category ? attachment.value.category.id : attachment.value.category_id,
      slug: attachment.value.slug,
      attachmentId: attachment.value.id,
    },
  }));

  return {
    categoryRoute,
    attachmentRoute,
  };
}

export function useAttachmentsList() {
  const attachmentsStore = useAttachmentsStore();
  const ids = computed(() => attachmentsStore.attachments.map((item: Attachment) => item.id));

  return useAttachmentsGroups(ids);
}

export function useAttachmentsSearch(query: Ref<string>) {
  const attachmentsStore = useAttachmentsStore();
  const results: ComputedRef<SearchResult[]> = computed(() => {
    if (query.value.length < 2) {
      return [];
    }

    const lowerCased = query.value.toLowerCase();

    return attachmentsStore.extendedAttachments.filter((attachment: Attachment) => {
      if (attachment.name.toLowerCase().includes(lowerCased)) {
        return true;
      } else if (attachment.slug.toLowerCase().includes(lowerCased)) {
        return true;
      }

      return false;
    }).map((attachment: Attachment) => ({
      id: attachment.id,
      game_id: attachment.game_id,
      name: attachment.name,
      description: attachment?.category?.name || '',
      route: {
        name: 'attachments.show',
        params: {
          categoryId: attachment.category ? attachment.category.id : attachment.category_id,
          slug: attachment.slug,
          attachmentId: attachment.id,
        },
      },
    }));
  });

  return {
    results,
  };
}
