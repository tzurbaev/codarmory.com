<template>
  <div>
    <TextInputGroup v-model="value.search">
      <InputLabel>
        <span class="text-white">Search</span>
      </InputLabel>
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
        <InputLabel>
          <span class="text-white">Match all pros</span>
        </InputLabel>
        <InputHint>
          <span class="text-gray-400">
            Select to match all choosen pros.
          </span>
        </InputHint>
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
        <InputLabel>
          <span class="text-white">Match all cons</span>
        </InputLabel>
        <InputHint>
          <span class="text-gray-400">
            Select to match all choosen cons.
          </span>
        </InputHint>
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
