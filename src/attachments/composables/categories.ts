import { useAttachmentsStore } from '@/attachments/stores/attachments';
import { computed, ComputedRef, Ref } from 'vue';
import { AttachmentCategory } from '@/attachments/types';
import { SearchResult } from '@/search/types';

export function useAttachmentCategory(id: ComputedRef<string | null>) {
  const store = useAttachmentsStore();
  const category: ComputedRef<AttachmentCategory | null> = computed(() => {
    if (!id.value) {
      return null;
    }

    const index = store.categories.findIndex((item: AttachmentCategory) => item.id === id.value);

    if (index === -1) {
      return null;
    }

    return store.categories[index];
  });

  return { category };
}

export function useAttachmentCategoriesMenu(id?: ComputedRef<string | null> | null) {
  const store = useAttachmentsStore();
  const menu = computed(() => store.categories.map((category: AttachmentCategory, index: number) => ({
    id: `attachments-category-${category.id}`,
    name: category.name,
    active: id?.value === category.id || (id?.value === null && index === 0),
    route: {
      name: 'attachments.index',
      params: {
        categoryId: category.id,
      },
    },
  })));

  return { menu };
}

export function useAttachmentCategoriesSearch(query: Ref<string>) {
  const store = useAttachmentsStore();
  const results: ComputedRef<SearchResult[]> = computed(() => {
    if (!query.value) {
      return [];
    }

    const lowerCased = query.value.toLowerCase();

    return store.categories.filter((category: AttachmentCategory) => {
      if (category.name.toLowerCase().includes(lowerCased)) {
        return true;
      } else if (category.id.toLowerCase().includes(lowerCased)) {
        return true;
      }

      return false;
    }).map((category: AttachmentCategory) => ({
      id: category.id,
      name: category.name,
      description: '',
      route: {
        name: 'attachments.index',
        params: {
          categoryId: category.id,
        },
      },
    }));
  });

  return {
    results,
  };
}
