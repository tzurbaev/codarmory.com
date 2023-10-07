<template>
  <div class="grid grid-cols-1 gap-4" :class="[withCategory ? 'sm:grid-cols-4' : 'sm:grid-cols-3']">
    <div>
      <TextInputGroup v-model="value.search">
        <InputLabel>Search</InputLabel>
        <TextInput type="search" placeholder="Filter weapons by name" />
      </TextInputGroup>
    </div>
    <div>
      <SelectInputGroup v-model="value.game_id">
        <InputLabel>
          <span class="text-primary-500">Game</span>
        </InputLabel>
        <SelectInput :options="gamesOptions">
          <template #empty>All games</template>
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
import { computed, watch } from 'vue';
import { WeaponsFilters } from '@/weapons/types';
import {
  SelectInputGroup, SelectInput, TextInputGroup, TextInput, InputLabel,
} from '@zenky/forms-vue';
import { useWeaponPlatformsOptions } from '@/weapons/composables/platforms';
import { useGamesOptions } from '@/games/composables/games';
import { storage } from '@/storage';

const props = defineProps<{
  modelValue: WeaponsFilters;
  withCategory?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (val: WeaponsFilters) => emit('update:modelValue', val),
});

const { options: platformsOptions } = useWeaponPlatformsOptions();
const { options: gamesOptions } = useGamesOptions();

watch(computed(() => value.value.game_id), (val) => storage.set('game_id', val));
</script>
