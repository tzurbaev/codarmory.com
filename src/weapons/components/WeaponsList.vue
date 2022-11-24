<template>
  <Panel :label="label">
    <WeaponsListFilters :with-category="withCategory" v-model="filters" />

    <p class="my-4 text-white/60 text-sm">
      {{ weapons.length }} weapon{{ weapons.length === 1 ? '' : 's' }}
      <template v-if="hasFilters">
        &bull;
        <a href="javascript:;" class="text-primary-600 hover:text-primary-500 hover:underline" @click="reset()">
          Reset filters
        </a>
      </template>
    </p>

    <EmptyState :count="weapons.length" @reset="reset">
      <template #default>
        <div class="grid grid-cols-1 gap-4 weapons-grid"
             :class="{
               'lg:grid-cols-1': weapons.length === 1,
               'lg:grid-cols-2': weapons.length === 2,
               'lg:grid-cols-3': weapons.length >= 3,
             }"
        >
          <div v-for="weapon in weapons"
               :key="`WeaponGridCard-${weapon.id}`"
               class="p-4 sm:p-8 rounded-lg border border-gray-700 bg-gray-900 flex flex-col"
          >
            <WeaponCard type="grid" :weapon="weapon" />
          </div>
        </div>
      </template>

      <template #header>No Weapons</template>
      <template #message>There are no weapons with selected filters.</template>
    </EmptyState>
  </Panel>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useWeaponsFilters, useWeaponsList } from '@/weapons/composables/weapons';
import WeaponCard from '@/weapons/components/WeaponCard.vue';
import Panel from '@/layout/components/Panel.vue';
import WeaponsListFilters from '@/weapons/components/WeaponsListFilters.vue';
import EmptyState from '@/layout/components/EmptyState.vue';

const props = defineProps<{
  label: string;
  categoryId?: string;
  attachmentId?: string;
  withCategory?: boolean;
  staticFilters?: string[];
}>();

const { filters, hasFilters, reset } = useWeaponsFilters(props);
const { weapons } = useWeaponsList(filters);

watch(props, reset);
</script>
