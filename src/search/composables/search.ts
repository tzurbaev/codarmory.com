import { useSearchStore } from '@/search/stores/search';
import { computed, ComputedRef, ref } from 'vue';
import { SearchResultsGroup } from '@/search/types';
import { useAttachmentCategoriesSearch } from '@/attachments/composables/categories';
import { useAttachmentsSearch } from '@/attachments/composables/attachments';
import { useWeaponCategoriesSearch } from '@/weapons/composables/categories';
import { useWeaponsSearch } from '@/weapons/composables/weapons';

export function useSearchControls() {
  const store = useSearchStore();
  const isOpen: ComputedRef<boolean> = computed(() => store.active);
  const open = () => {
    store.open();
  };
  const close = () => {
    store.close();
  };
  const toggle = () => {
    if (isOpen.value) {
      close();
    } else {
      open();
    }
  };

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

export function useSearch() {
  const query = ref('');
  const reset = () => {
    query.value = '';
  };

  const { results: attachmentCategories } = useAttachmentCategoriesSearch(query);
  const { results: attachments } = useAttachmentsSearch(query);
  const { results: weaponCategories } = useWeaponCategoriesSearch(query);
  const { results: weapons } = useWeaponsSearch(query);

  const results: ComputedRef<SearchResultsGroup[]> = computed(() => {
    const groups: SearchResultsGroup[] = [];

    if (!query.value) {
      return [];
    }

    if (weaponCategories.value.length > 0) {
      groups.push({
        name: 'Weapon Categories',
        results: weaponCategories.value,
      });
    }

    if (weapons.value.length > 0) {
      groups.push({
        name: 'Weapons',
        results: weapons.value,
      });
    }

    if (attachmentCategories.value.length > 0) {
      groups.push({
        name: 'Attachment Categories',
        results: attachmentCategories.value.slice(0, 3),
      });
    }

    if (attachments.value.length > 0) {
      groups.push({
        name: 'Attachments',
        results: attachments.value,
      });
    }

    return groups;
  });

  return {
    query,
    results,
    reset,
  };
}
