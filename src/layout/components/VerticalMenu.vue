<template>
  <div>
    <div class="sm:hidden">
      <SelectInputGroup v-model="selected">
        <InputLabel class="sr-only">{{ label }}</InputLabel>
        <SelectInput :options="menu" />
      </SelectInputGroup>
    </div>
    <nav class="hidden sm:block space-y-1" :aria-label="label">
      <router-link v-for="item in menu"
                   :key="item.name"
                   :to="item.route"
                   :class="[item.active ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-900 hover:text-white', 'flex items-center px-3 py-2 text-sm font-medium rounded-md']"
                   :aria-current="item.active ? 'page' : undefined"
      >
        <span class="truncate">{{ item.name }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { MenuItem } from '@/layout/types';
import { useMobileMenuNavigation } from '@/layout/composables/menu';
import { SelectInputGroup, SelectInput, InputLabel } from '@zenky/forms-vue';

const props = defineProps<{
  label: string;
  menu: MenuItem[];
}>();

const router = useRouter();
const { selected } = useMobileMenuNavigation(router, props.menu);
</script>
