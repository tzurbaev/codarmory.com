<template>
  <div>
    <TextInputGroup v-model="value.search">
      <InputLabel>Search</InputLabel>
      <TextInput type="search" placeholder="Filter attachments by name" />
    </TextInputGroup>
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
import { AttachmentsFilters, AttachmentStat } from '@/attachments/types';
import {
  InputLabel, TextInputGroup, TextInput,
  SelectInputGroup, SelectInput,
} from '@zenky/forms-vue';
import ResourceCombobox from '@/forms/components/ResourceCombobox.vue';
import {computed, ref, watch} from 'vue';

const props = defineProps<{
  modelValue: AttachmentsFilters;
  pros: AttachmentStat[];
  cons: AttachmentStat[];
  hasFilters: boolean;
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
watch(statsMode, () => {
  value.value.matchAllPros = statsMode.value === 'and';
  value.value.matchAllCons = statsMode.value === 'and';
});
</script>
