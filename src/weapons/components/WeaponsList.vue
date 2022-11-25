<template>
  <Panel :label="label">
    <WeaponsListFilters v-model="filters" />

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
               'lg:grid-cols-2 xl:grid-cols-3': weapons.length >= 3,
             }"
        >
          <Panel v-for="weapon in weapons"
                 :key="`WeaponGridCard-${weapon.id}`"
                 class="border border-gray-700 flex flex-col"
          >
            <WeaponCard type="grid" :weapon="weapon" />
          </Panel>
        </div>
      </template>

      <template #header>No Weapons</template>
      <template #message>There are no weapons with selected filters.</template>
    </EmptyState>
  </Panel>
</template>

<script setup lang="ts">
import {computed, watch} from 'vue';
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

const { filters, hasFilters, reset } = useWeaponsFilters();
const { categories, weapons } = useWeaponsList(computed(() => ({
  category_id: props.categoryId,
  attachment_id: props.attachmentId,
})), filters);

watch(props, reset);
</script>
