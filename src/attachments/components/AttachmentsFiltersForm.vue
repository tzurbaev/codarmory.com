<template>
  <div :class="[withGame ? 'sm:col-span-2' : '']">
    <TextInputGroup v-model="value.search">
      <InputLabel>Search</InputLabel>
      <TextInput type="search" placeholder="Filter by name" />
    </TextInputGroup>
  </div>

  <div v-if="withGame" class>
    <SelectInputGroup v-model="value.game_id">
      <InputLabel>
        <span class="text-primary-500">Game</span>
      </InputLabel>
      <SelectInput :options="gameOptions">
        <template #empty>All Games</template>
      </SelectInput>
    </SelectInputGroup>
  </div>

  <div>
    <ResourceCombobox label="Pros" :items="pros" :multiple="true" v-model="value.pros" />
  </div>

  <div>
    <ResourceCombobox label="Cons" :items="cons" :multiple="true" v-model="value.cons" />
  </div>

  <div>
    <SelectInputGroup v-model="statsMode">
      <InputLabel>Display weapons with</InputLabel>
      <SelectInput :options="statsOptions" />
    </SelectInputGroup>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { AttachmentsFilters, AttachmentStat } from '@/attachments/types';
import {
  InputLabel, TextInputGroup, TextInput,
  SelectInputGroup, SelectInput,
} from '@zenky/forms-vue';
import ResourceCombobox from '@/forms/components/ResourceCombobox.vue';
import { useGamesOptions } from '@/games/composables/games';

const props = defineProps<{
  modelValue: AttachmentsFilters;
  pros: AttachmentStat[];
  cons: AttachmentStat[];
  hasFilters: boolean;
  withGame?: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'reset']);
const value = computed({
  get: () => props.modelValue,
  set: (val: AttachmentsFilters) => emit('update:modelValue', val),
});
const statsMode = ref('or');
const statsOptions = [
  { id: 'or', name: 'Any of selected stats' },
  { id: 'and', name: 'All of selected stats' },
];
const { options: gameOptions } = useGamesOptions();

watch(statsMode, () => {
  value.value.matchAllPros = statsMode.value === 'and';
  value.value.matchAllCons = statsMode.value === 'and';
});
</script>
