<template>
  <div>
    <div class="mb-4">
      <div class="w-full">
        <TextInputGroup v-model="search">
          <InputLabel>Filter weapons by name</InputLabel>
          <TextInput type="search" />
        </TextInputGroup>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 weapons-grid"
         :class="{
           'lg:grid-cols-1': weapons.length === 1,
           'lg:grid-cols-2': weapons.length === 2,
           'lg:grid-cols-3': weapons.length >= 3,
         }"
    >
      <div v-for="weapon in weapons"
           :key="`WeaponGridCard-${weapon.id}`"
           class="p-8 rounded-lg shadow-lg hover:shadow-xl bg-gray-900 flex flex-col"
      >
        <WeaponCard type="grid" :weapon="weapon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useWeaponsList } from '@/weapons/composables/weapons';
import WeaponCard from '@/weapons/components/WeaponCard.vue';
import { WeaponsFilters } from '@/weapons/types';
import { InputLabel, TextInputGroup, TextInput } from '@zenky/forms-vue';

const props = defineProps<{
  categoryId?: string;
  attachmentId?: string;
  withoutMenu?: boolean;
}>();

const search = ref('');
const filters: ComputedRef<WeaponsFilters> = computed(() => ({
  category_id: props.categoryId,
  attachment_id: props.attachmentId,
  search: search.value,
}));

const { weapons } = useWeaponsList(filters);
</script>
