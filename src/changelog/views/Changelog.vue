<template>
  <Panel label="Changelog">
    <div class="space-y-8 prose max-w-4xl prose-invert prose-h2:text-primary-500" v-html="html" />
  </Panel>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHead } from '@vueuse/head';
import Panel from '@/layout/components/Panel.vue';
import * as changelog from '@/changelog/markdown/changelog.md';

useHead({
  title: 'Changelog',
});

const html = computed(() => (changelog as any)?.html);
</script>
