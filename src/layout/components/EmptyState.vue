<template>
  <div v-if="count > 0">
    <slot />
  </div>
  <div v-else class="flex flex-col items-center py-16 border border-gray-700 rounded-lg px-16 text-center">
    <QuestionMarkCircleIcon class="text-primary-500 h-12 w-12" />

    <h3 class="text-3xl font-extrabold text-white mt-4">
      <slot name="header" />
    </h3>

    <p class="text-lg text-white/90 mt-4">
      <slot name="message" />
    </p>

    <button type="button" @click="$emit('reset')" class="flex items-center bg-primary-600 px-3 py-2 rounded-lg hover:bg-primary-500 text-white shadow-md mt-4">
      <slot name="button">
        <XMarkIcon class="h-4 w-4 mr-1" />
        Reset Filters
      </slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline';

defineProps<{
  count: number;
}>();

defineEmits(['reset']);
</script>
