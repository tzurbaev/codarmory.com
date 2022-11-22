<template>
  <nav class="flex" aria-label="Breadcrumbs">
    <ol class="flex items-center space-x-4">
      <li>
        <div>
          <router-link :to="{ name: 'home' }" class="text-gray-400 hover:text-gray-500">
            <HomeIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </router-link>
        </div>
      </li>
      <li v-for="page in pages" :key="page.name">
        <div class="flex items-center">
          <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          <router-link class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                       :to="page.route"
          >
            {{ page.name }}
          </router-link>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { ChevronRightIcon, HomeIcon } from '@heroicons/vue/20/solid';
import { RouteRecordRaw } from 'vue-router';

defineProps<{
  pages: {
    route: any;
    name: string;
  }[];
}>();
</script>
