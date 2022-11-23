<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-40" @close="$emit('close')">
      <TransitionChild as="template"
                       enter="ease-out duration-300"
                       enter-from="opacity-0"
                       enter-to="opacity-100"
                       leave="ease-in duration-200"
                       leave-from="opacity-100"
                       leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-700 bg-opacity-70 backdrop-blur-sm transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template"
                           enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100"
                           leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-gray-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6 lg:p-8">
              <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button type="button" class="rounded-md bg-gray-900 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" @click="$emit('close')">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog, DialogPanel, TransitionChild, TransitionRoot,
} from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

defineProps<{
  open: boolean;
}>();

defineEmits(['close']);
</script>
