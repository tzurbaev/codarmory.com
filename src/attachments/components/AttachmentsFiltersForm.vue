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
    <ToggleInputGroup v-model="value.matchAllPros">
      <ToggleInput />
      <ToggleInputDescription>
        <InputLabel>Match all pros</InputLabel>
        <InputHint>Select to match all choosen pros.</InputHint>
      </ToggleInputDescription>
    </ToggleInputGroup>
  </div>

  <div>
    <ResourceCombobox label="Cons" :items="cons" :multiple="true" v-model="value.cons" />
  </div>

  <div>
    <ToggleInputGroup v-model="value.matchAllCons">
      <ToggleInput />
      <ToggleInputDescription>
        <InputLabel>Match all cons</InputLabel>
        <InputHint>Select to match all choosen cons.</InputHint>
      </ToggleInputDescription>
    </ToggleInputGroup>
  </div>
</template>

<script setup lang="ts">
import { AttachmentsFilters, AttachmentStat } from '@/attachments/types';
import {
  InputLabel, TextInputGroup, TextInput,
  ToggleInputGroup, ToggleInput, ToggleInputDescription, InputHint,
} from '@zenky/forms-vue';
import ResourceCombobox from '@/forms/components/ResourceCombobox.vue';
import { computed } from 'vue';

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
</script>
