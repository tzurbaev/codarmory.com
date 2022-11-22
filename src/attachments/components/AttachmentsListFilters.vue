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
                  <div class="flex h-full flex-col overflow-y-scroll bg-gray-900 py-6 shadow-xl">
                    <div class="px-4 sm:px-6">
                      <div class="flex items-start justify-between">
                        <DialogTitle class="text-lg font-medium text-white">Attachments Filters</DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="rounded-md bg-gray-900 text-gray-500 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" @click="open = false">
                            <span class="sr-only">Close filters</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                      <div class="absolute inset-0 px-4 sm:px-6 space-y-4">
                        <slot />
                      </div>
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
import { ref } from 'vue';
import {
  Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,
} from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

defineProps<{
  hasFilters: boolean;
}>();

const open = ref(false);
</script>
