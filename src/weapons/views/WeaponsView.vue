<template>
  <SidebarMenuPage>
    <template #sidebar>
      <VerticalMenu label="Select Weapons Category" :menu="menu" />
    </template>

    <template #default>
      <WeaponsList :label="category?.name || 'All Weapons'"
                   :category-id="id"
                   :static-filters="['category_id']"
      />
    </template>
  </SidebarMenuPage>
</template>

<script setup lang="ts">
import { computed, ComputedRef, watch } from 'vue';
import { useWeaponCategoriesMenu, useWeaponCategory } from '@/weapons/composables/categories';
import WeaponsList from '@/weapons/components/WeaponsList.vue';
import VerticalMenu from '@/layout/components/VerticalMenu.vue';
import SidebarMenuPage from '@/layout/components/SidebarMenuPage.vue';
import { useHead } from '@vueuse/head';

const props = defineProps<{
  categoryId?: string;
}>();

const id: ComputedRef<string | null> = computed(() => props.categoryId || null);
const { category } = useWeaponCategory(id);
const { menu } = useWeaponCategoriesMenu(id);

watch(category, () => {
  if (!category.value) {
    useHead({ title: 'Weapons' });
  } else {
    useHead({ title: `${category.value.name} – Weapons` });
  }
}, { immediate: true });
</script>
