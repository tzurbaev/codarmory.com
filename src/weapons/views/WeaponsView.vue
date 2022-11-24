<template>
  <div>
    <PageHeader>
      <template v-if="category">{{ category.name }}</template>
      <template v-else>All Weapons</template>
    </PageHeader>
    <div class="mt-4 sm:mt-0">
      <div class="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div class="col-span-1">
          <VerticalMenu label="Select Weapons Category" :menu="menu" class="lg:sticky lg:top-[10%]" />
        </div>

        <div class="sm:col-span-5">
          <WeaponsList class="mt-4 sm:mt-0 sm:py-8" :category-id="id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useWeaponCategoriesMenu, useWeaponCategory } from '@/weapons/composables/categories';
import PageHeader from '@/layout/components/PageHeader.vue';
import WeaponsList from '@/weapons/components/WeaponsList.vue';
import VerticalMenu from '@/layout/components/VerticalMenu.vue';

const props = defineProps<{
  categoryId?: string;
}>();

const id: ComputedRef<string | null> = computed(() => props.categoryId || null);
const { category } = useWeaponCategory(id);
const { menu } = useWeaponCategoriesMenu(id);
</script>
