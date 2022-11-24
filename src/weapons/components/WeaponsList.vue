<template>
  <div class="p-8 rounded-lg shadow-lg bg-gray-900 flex flex-col">
    <h2 class="text-2xl text-white font-extrabold mb-4">{{ label }}</h2>

    <div class="grid grid-cols-1 gap-4" :class="[withCategory ? 'sm:grid-cols-3' : 'sm:grid-cols-2']">
      <div>
        <TextInputGroup v-model="search">
          <InputLabel>Search</InputLabel>
          <TextInput type="search" placeholder="Filter weapons by name" />
        </TextInputGroup>
      </div>
      <div v-if="withCategory">
        <SelectInputGroup v-model="selectedCategoryId">
          <InputLabel>Category</InputLabel>
          <SelectInput :options="categoriesOptions">
            <template #empty>All Categories</template>
          </SelectInput>
        </SelectInputGroup>
      </div>
      <div>
        <SelectInputGroup v-model="platformId">
          <InputLabel>Platform</InputLabel>
          <SelectInput :options="platformsOptions">
            <template #empty>All platforms</template>
          </SelectInput>
        </SelectInputGroup>
      </div>
    </div>

    <p class="my-4 text-white/60 text-sm">
      {{ weapons.length }} weapons
    </p>

    <div class="grid grid-cols-1 gap-4 weapons-grid"
         :class="{
           'lg:grid-cols-1': weapons.length === 1,
           'lg:grid-cols-2': weapons.length === 2,
           'lg:grid-cols-3': weapons.length >= 3,
         }"
    >
      <div v-for="weapon in weapons"
           :key="`WeaponGridCard-${weapon.id}`"
           class="p-8 rounded-lg border border-gray-700 bg-gray-900 flex flex-col"
      >
        <WeaponCard type="grid" :weapon="weapon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ComputedRef, ref, watch} from 'vue';
import { useWeaponsList } from '@/weapons/composables/weapons';
import WeaponCard from '@/weapons/components/WeaponCard.vue';
import { WeaponsFilters } from '@/weapons/types';
import {
  InputLabel, TextInputGroup, TextInput, SelectInputGroup, SelectInput,
} from '@zenky/forms-vue';
import { useWeaponPlatformsOptions } from '@/weapons/composables/platforms';
import {useWeaponCategories, useWeaponCategoriesOptions} from "@/weapons/composables/categories";

const props = defineProps<{
  label: string;
  categoryId?: string;
  attachmentId?: string;
  withCategory?: boolean;
}>();

const search = ref('');
const platformId = ref(null);
const selectedCategoryId = ref(null);
const filters: ComputedRef<WeaponsFilters> = computed(() => ({
  category_id: props.withCategory ? selectedCategoryId.value : props.categoryId,
  attachment_id: props.attachmentId,
  platform_id: platformId.value,
  search: search.value,
}));

const { weapons } = useWeaponsList(filters);
const { options: categoriesOptions } = useWeaponCategoriesOptions();
const { options: platformsOptions } = useWeaponPlatformsOptions();
watch(props, () => {
  search.value = '';
  platformId.value = null;
  selectedCategoryId.value = null;
});
</script>
