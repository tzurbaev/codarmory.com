<template>
  <Panel label="Changelog">
    <div class="space-y-8">
      <div v-for="item in changelog" :key="`ChangelogItem-${item.date}`">
        <h3 class="text-primary-500 text-2xl font-extrabold">{{ item.date }}</h3>
        <p class="text-white/90">{{ item.description}}</p>
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import Panel from '@/layout/components/Panel.vue';
import { useChangelog } from '@/changelog/composables/changelog';

const { changelog } = useChangelog();
</script>
