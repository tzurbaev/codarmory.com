<template>
  <Panel label="Changelog">
    <div class="space-y-8 prose max-w-4xl prose-invert">
      <div v-for="item in changelog" :key="`ChangelogItem-${item.date}`">
        <h3 class="text-primary-500">{{ item.date }}</h3>
        <ul>
          <li v-for="(line, index) in item.lines" :key="`ChangelogItem-${item.date}-Line-${index}`">
            {{ line }}
          </li>
        </ul>
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import Panel from '@/layout/components/Panel.vue';
import { useChangelog } from '@/changelog/composables/changelog';

const { changelog } = useChangelog();
</script>
