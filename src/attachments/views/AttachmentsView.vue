<template>
  <SidebarMenuPage>
    <template #sidebar>
      <VerticalMenu label="Select Attachments Category" :menu="menu" />
    </template>

    <template #default>
      <Panel :label="panelLabel">
        <AttachmentsList :groups="groups" :category-id="categoryId" :with-game="true" />
      </Panel>
    </template>
  </SidebarMenuPage>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useHead } from '@vueuse/head';
import { useAttachmentCategoriesMenu, useAttachmentCategory } from '@/attachments/composables/categories';
import { useAttachmentsList } from '@/attachments/composables/attachments';
import Panel from '@/layout/components/Panel.vue';
import AttachmentsList from '@/attachments/components/AttachmentsList.vue';
import VerticalMenu from '@/layout/components/VerticalMenu.vue';
import SidebarMenuPage from '@/layout/components/SidebarMenuPage.vue';

const props = defineProps<{
  categoryId?: string;
}>();

const id = computed(() => props.categoryId || null);
const { groups } = useAttachmentsList();
const { menu } = useAttachmentCategoriesMenu(id);
const { category } = useAttachmentCategory(id);
const panelLabel = computed(() => category.value?.name || 'Attachments');

watch(category, () => {
  if (category.value) {
    useHead({ title: category.value.name });
  } else {
    useHead({ title: 'Attachments' });
  }
}, { immediate: true });
</script>
