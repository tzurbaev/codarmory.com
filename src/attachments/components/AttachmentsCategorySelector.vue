<template>
  <div>
    <div class="lg:hidden mt-4">
      <label for="attachment-category-selector" class="sr-only">Select a category</label>
      <select id="attachment-category-selector"
              name="tabs"
              class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              v-model="value"
      >
        <option v-for="group in groups"
                :key="group.category.id"
                :value="group.category.id"
        >
          {{ group.category.name }}
        </option>
      </select>
    </div>
    <div class="hidden lg:block">
      <div class="border-b border-gray-700">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <a v-for="group in groups"
             :key="group.category.id"
             href="javascript:;"
             :class="[value === group.category.id ? 'border-primary-500 text-primary-600' : 'border-transparent text-white hover:text-primary-600 hover:border-primary-500', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm']"
             :aria-current="value === group.category.id ? 'page' : undefined"
             @click="$emit('select', group.category.id)"
          >
            {{ group.category.name }}
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { AttachmentsGroup } from '@/attachments/types';

const props = defineProps<{
  modelValue: string;
  groups: AttachmentsGroup[];
}>();
const emit = defineEmits(['update:modelValue', 'select']);
const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
});
</script>
