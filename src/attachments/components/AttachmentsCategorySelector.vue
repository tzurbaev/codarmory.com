<template>
  <div>
    <div class="lg:hidden mt-4">
      <SelectInputGroup v-model="value">
        <InputLabel>Category</InputLabel>
        <SelectInput :options="mobileNavigationItems" />
      </SelectInputGroup>
    </div>
    <div class="hidden lg:block">
      <div class="border-b border-gray-700">
        <nav class="-mb-px flex space-x-4" aria-label="Tabs">
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
import { SelectInputGroup, SelectInput, InputLabel } from '@zenky/forms-vue';

const props = defineProps<{
  modelValue: string | null;
  groups: AttachmentsGroup[];
}>();
const emit = defineEmits(['update:modelValue', 'select']);
const value = computed({
  get: () => props.modelValue,
  set: (val: string | null) => emit('update:modelValue', val),
});
const mobileNavigationItems = computed(() => props.groups.map((group: AttachmentsGroup) => ({
  id: group.category.id,
  name: group.category.name,
})));
</script>
