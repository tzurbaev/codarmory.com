<template>
  <div>
    <ComboboxInputGroup v-model="value" :multiple="multiple">
      <InputLabel class="text-white text-sm">{{ label }}</InputLabel>
      <ComboboxInput :options="options" @change="query = $event">
        <template v-slot:empty>Please select {{ label.toLowerCase() }}</template>
        <template v-slot:item="{ active, selected, item }">
          <slot name="item" :active="active" :selected="selected" :item="item" />
        </template>
      </ComboboxInput>
    </ComboboxInputGroup>

    <slot name="values" :has-values="hasMultipleValues" :values="selectedValues" :remove="onRemove">
      <div v-if="hasMultipleValues" class="mt-2 flex flex-col gap-1 items-start">
        <template v-for="selected in selectedValues" :key="`SelectedOption-${selected.id}`">
          <span class="inline-flex items-center rounded-md bg-primary-100 py-0.5 pl-2 pr-0.5 text-xs font-medium text-primary-700">
            {{ selected.name }}
            <button type="button"
                    class="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-primary-400 hover:bg-primary-200 hover:text-primary-500 focus:bg-primary-500 focus:text-white focus:outline-none"
                    @click="onRemove(selected.id)"
                    tabindex="-1"
            >
              <span class="sr-only">Delete {{ selected.name }}</span>
              <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        </template>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ComboboxInputGroup, ComboboxInput, InputLabel } from '@zenky/forms-vue';

const props = defineProps<{
  label: string,
  items: any[],
  modelValue: string | string[] | null,
  multiple?: boolean,
}>();

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
const query = ref('');
const list = computed(() => props.items.map((item) => ({
  id: item.id,
  name: item.name,
})));

const options = computed(() => {
  const lowerCased = query.value.toLowerCase();

  return list.value.filter((item) => item.name.toLowerCase().includes(lowerCased) || item.id.toLowerCase().includes(lowerCased));
});

const hasMultipleValues = computed(() => props.multiple && Array.isArray(value.value) && value.value.length > 0);
const selectedValues = computed(() => {
  if (!hasMultipleValues.value) {
    return [];
  }

  return props.items.filter((item) => (value.value || []).indexOf(item.id) !== -1);
});

const onRemove = (id: string) => {
  if (!Array.isArray(value.value)) {
    return;
  }

  value.value = value.value.filter((item: any) => item !== id);
};
</script>
