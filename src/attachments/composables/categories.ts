import { useAttachmentsStore } from '@/attachments/stores/attachments';
import { computed, ComputedRef } from 'vue';
import { AttachmentCategory } from '@/attachments/types';

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

export function useAttachmentCategoriesMenu(id: ComputedRef<string | null>) {
  const store = useAttachmentsStore();
  const menu = computed(() => store.categories.map((category: AttachmentCategory, index: number) => ({
    id: `attachments-category-${category.id}`,
    name: category.name,
    active: id.value === category.id || (id.value === null && index === 0),
    route: {
      name: 'attachments.index',
      params: {
        categoryId: category.id,
      },
    },
  })));

  return { menu };
}
