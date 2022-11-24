<template>
  <div class="grid grid-cols-1 gap-4" :class="[withCategory ? 'sm:grid-cols-3' : 'sm:grid-cols-2']">
    <div>
      <TextInputGroup v-model="value.search">
        <InputLabel>Search</InputLabel>
        <TextInput type="search" placeholder="Filter weapons by name" />
      </TextInputGroup>
    </div>
    <div v-if="withCategory">
      <SelectInputGroup v-model="value.category_id">
        <InputLabel>Category</InputLabel>
        <SelectInput :options="categoriesOptions">
          <template #empty>All Categories</template>
        </SelectInput>
      </SelectInputGroup>
    </div>
    <div>
      <SelectInputGroup v-model="value.platform_id">
        <InputLabel>Platform</InputLabel>
        <SelectInput :options="platformsOptions">
          <template #empty>All platforms</template>
        </SelectInput>
      </SelectInputGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WeaponsFilters } from '@/weapons/types';
import { computed } from 'vue';
import { useWeaponCategoriesOptions } from '@/weapons/composables/categories';
import { useWeaponPlatformsOptions } from '@/weapons/composables/platforms';
import {
  SelectInputGroup, SelectInput, TextInputGroup, TextInput, InputLabel,
} from '@zenky/forms-vue';

const props = defineProps<{
  modelValue: WeaponsFilters;
  withCategory?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (val: WeaponsFilters) => emit('update:modelValue', val),
});

const { options: categoriesOptions } = useWeaponCategoriesOptions();
const { options: platformsOptions } = useWeaponPlatformsOptions();
</script>
