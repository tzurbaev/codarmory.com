<template>
  <nav class="space-y-1 py-8" :aria-label="label">
    <router-link v-for="item in menu"
                 :key="item.name"
                 :to="item.route"
                 :class="[item.active ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-900 hover:text-white', 'flex items-center px-3 py-2 text-sm font-medium rounded-md']"
                 :aria-current="item.active ? 'page' : undefined"
    >
      <span class="truncate">{{ item.name }}</span>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  menu: {
    name: string;
    route: object;
    active: boolean;
  }[];
}>();
</script>
