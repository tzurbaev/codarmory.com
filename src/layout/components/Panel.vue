<template>
  <div class="p-4 sm:p-8 rounded-lg shadow-lg bg-gray-900">
    <h3 class="text-2xl text-white font-extrabold mb-4">{{ label }}</h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>
