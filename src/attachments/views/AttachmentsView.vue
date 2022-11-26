<template>
  <div class="grid grid-cols-1 sm:grid-cols-6 gap-4">
    <div class="col-span-1">
      <VerticalMenu label="Select Attachments Category" :menu="menu" class="lg:sticky lg:top-[10%]" />
    </div>

    <div class="sm:col-span-5">
      <div class="mt-4 sm:mt-0">
        <Panel :label="category?.name || 'Attachments'">
          <AttachmentsList :groups="groups" :category-id="categoryId" />
        </Panel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Panel from '@/layout/components/Panel.vue';
import { useAttachmentsList } from '@/attachments/composables/attachments';
import AttachmentsList from '@/attachments/components/AttachmentsList.vue';
import { useAttachmentCategoriesMenu, useAttachmentCategory } from '@/attachments/composables/categories';
import VerticalMenu from '@/layout/components/VerticalMenu.vue';
import { computed } from 'vue';

const props = defineProps<{
  categoryId?: string;
}>();

const id = computed(() => props.categoryId || null);
const { groups } = useAttachmentsList();
const { menu } = useAttachmentCategoriesMenu(id);
const { category } = useAttachmentCategory(id);
</script>
