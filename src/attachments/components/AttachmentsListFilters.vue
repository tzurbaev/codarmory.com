<template>
  <Disclosure as="section" aria-labelledby="filter-heading" class="grid items-center border-b border-gray-300">
    <h2 id="filter-heading" class="sr-only">Filters</h2>
    <div class="relative col-start-1 row-start-1 py-4">
      <div class="flex space-x-6 divide-x divide-gray-300 text-sm">
        <div>
          <DisclosureButton class="group flex items-center font-medium text-gray-200">
            <FunnelIcon class="mr-2 h-5 w-5 flex-none text-white group-hover:text-gray-300" aria-hidden="true" />
            Filters
          </DisclosureButton>
        </div>
        <div v-if="hasFilters" class="pl-6">
          <button type="button" class="text-white" @click="$emit('reset')">Clear all</button>
        </div>
      </div>
    </div>
    <DisclosurePanel class="border-t border-gray-300 py-10">
      <div class="text-sm">
        <div class="max-w-4xl grid grid-cols-1 md:gap-6">
          <div class="col-span-1">
            <TextInputGroup v-model="value.search">
              <InputLabel><span class="text-white">Search</span></InputLabel>
              <TextInput type="search" placeholder="Filter attachments by name" />
            </TextInputGroup>
          </div>
          <div class="col-span-1">
            <div>
              <CheckboxesInputGroup v-model="value.pros" type="grid">
                <InputLabel><span class="text-white">Pros</span></InputLabel>
                <CheckboxesInput :checkboxes="pros" grid="grid grid-cols-1 sm:grid-cols-3 gap-4" />
              </CheckboxesInputGroup>
            </div>
            <RadioInputGroup v-model="value.prosMode">
              <InputLabel>Pros Match</InputLabel>
              <CardsRadioInput :options="modes" />
            </RadioInputGroup>
          </div>
          <div class="col-span-1">
            <div>
              <CheckboxesInputGroup v-model="value.cons" type="grid">
                <InputLabel><span class="text-white">Cons</span></InputLabel>
                <CheckboxesInput :checkboxes="cons" grid="grid grid-cols-1 sm:grid-cols-6 gap-4" />
              </CheckboxesInputGroup>
            </div>
            <RadioInputGroup v-model="value.consMode">
              <InputLabel><span class="text-white">Cons Match</span></InputLabel>
              <CardsRadioInput :options="modes" />
            </RadioInputGroup>
          </div>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  Disclosure, DisclosureButton, DisclosurePanel,
} from '@headlessui/vue';
import { FunnelIcon } from '@heroicons/vue/20/solid';
import { AttachmentsFilters, AttachmentStat } from '@/attachments/types';
import { InputLabel, TextInputGroup, TextInput, SelectInputGroup, SelectInput, RadioInputGroup, CardsRadioInput, CheckboxesInputGroup, CheckboxesInput } from '@zenky/forms-vue';
import ResourceCombobox from '@/forms/components/ResourceCombobox.vue';

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
const modes = [
  { id: 'or', name: 'Any', description: 'Will show attachments with any of selected stats.' },
  { id: 'and', name: 'All', description: 'Will show attachments with all of selected stats.' },
];
</script>
