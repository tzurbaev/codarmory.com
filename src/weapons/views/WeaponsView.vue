<template>
  <div>
    <PageHeader>
      <template v-if="category">{{ category.name }}</template>
      <template v-else>All Weapons</template>
    </PageHeader>
    <WeaponsList class="mt-4 sm:mt-0" :category-id="id" />
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useWeaponCategory } from '@/weapons/composables/categories';
import PageHeader from '@/layout/components/PageHeader.vue';
import WeaponsList from '@/weapons/components/WeaponsList.vue';

const props = defineProps<{
  categoryId?: string;
}>();

const id: ComputedRef<string | null> = computed(() => props.categoryId || null);
const { category } = useWeaponCategory(id);
</script>
