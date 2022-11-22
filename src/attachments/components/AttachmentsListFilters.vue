<template>
  <div>
    <div>
      <button type="button" class="text-sm text-white" @click="open = true">Open Filters Window</button>
    </div>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild as="template"
                         enter="ease-in-out duration-500"
                         enter-from="opacity-0"
                         enter-to="opacity-100"
                         leave="ease-in-out duration-500"
                         leave-from="opacity-100"
                         leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
              <TransitionChild as="template"
                               enter="transform transition ease-in-out duration-200"
                               enter-from="-translate-x-full"
                               enter-to="translate-x-0"
                               leave="transform transition ease-in-out duration-200"
                               leave-from="translate-x-0"
                               leave-to="-translate-x-full"
              >
                <DialogPanel class="pointer-events-auto w-screen max-w-3xl">
                  <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div class="px-4 sm:px-6">
                      <div class="flex items-start justify-between">
                        <DialogTitle class="text-lg font-medium text-gray-900">Attachments Filters</DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" @click="open = false">
                            <span class="sr-only">Close filters</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                      <div class="absolute inset-0 px-4 sm:px-6">
                        <div>
                          <TextInputGroup v-model="value.search">
                            <InputLabel>Search</InputLabel>
                            <TextInput type="search" placeholder="Filter attachments by name" />
                          </TextInputGroup>
                        </div>

                        <div class="mt-4 bg-gray-100 rounded-md p-3 shadow space-y-4">
                          <div>
                            <ResourceCombobox label="Pros" :items="pros" :multiple="true" v-model="value.pros" />
                          </div>
                          <div>
                            <RadioInputGroup v-model="value.prosMode">
                              <InputLabel>Mode</InputLabel>
                              <CardsRadioInput :options="modes" class="grid grid-cols-2 gap-4" />
                            </RadioInputGroup>
                          </div>
                        </div>

                        <div class="mt-4 bg-gray-100 rounded-md p-3 shadow space-y-4">
                          <div>
                            <ResourceCombobox label="Cons" :items="cons" :multiple="true" v-model="value.cons" />
                          </div>
                          <div>
                            <RadioInputGroup v-model="value.consMode">
                              <InputLabel>Mode</InputLabel>
                              <CardsRadioInput :options="modes" class="grid grid-cols-2 gap-4" />
                            </RadioInputGroup>
                          </div>
                        </div>
                      </div>
                      <!-- /End replace -->
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,
} from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { AttachmentsFilters, AttachmentStat } from '@/attachments/types';
import {
  InputLabel, TextInputGroup, TextInput, RadioInputGroup, CardsRadioInput, CheckboxesInputGroup, CheckboxesInput,
} from '@zenky/forms-vue';
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
const open = ref(false);
</script>
