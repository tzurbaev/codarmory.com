<template>
  <div>
    <AttachmentsCategorySelector v-if="withCategory" :groups="groups" v-model="category" @select="setCategory" />

    <div v-if="group" class="mt-4">
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        <AttachmentsFiltersForm :pros="pros"
                                :cons="cons"
                                :has-filters="hasFilters"
                                v-model="filters"
                                @reset="reset"
        />
      </div>
      <div>
        <p class="text-white/60 text-sm mb-4">
          {{ attachments.length }} attachment{{ attachments.length === 1 ? '' : 's'}}
          <template v-if="attachments.length !== group.attachments.length">
            &bull;
            <a href="javascript:;" class="text-primary-600 hover:text-primary-500 hover:underline" @click="reset()">
              Reset Filters
            </a>
          </template>
        </p>

        <EmptyState :count="attachments.length" @reset="reset">
          <template #default>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-4 attachments-grid">
              <div v-for="attachment in attachments"
                   :key="`AttachmentGridCard-${attachment.id}`"
                   class="border border-gray-700 rounded-md p-3"
              >
                <AttachmentCard type="grid" :attachment="attachment" @stat="addStatFilter" />
              </div>
            </div>
          </template>
          <template #header>No Attachments</template>
          <template #message>There are no attachments with selected filters.</template>
        </EmptyState>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AttachmentsGroup } from '@/attachments/types';
import AttachmentsCategorySelector from '@/attachments/components/AttachmentsCategorySelector.vue';
import { useCategoryAttachments, useFilteredAttachments } from '@/attachments/composables/attachments';
import { computed, watch } from 'vue';
import AttachmentCard from '@/attachments/components/AttachmentCard.vue';
import AttachmentsFiltersForm from '@/attachments/components/AttachmentsFiltersForm.vue';
import EmptyState from '@/layout/components/EmptyState.vue';

const props = defineProps<{
  groups: AttachmentsGroup[];
  categoryId?: string;
  withCategory?: boolean;
}>();

const currentCategoryId = computed(() => props.categoryId);
const currentGroups = computed(() => props.groups);

const {
  category, group, setCategory, watchForCategory,
} = useCategoryAttachments(currentGroups);

const {
  filters, reset, hasFilters, pros, cons, attachments,
} = useFilteredAttachments(group);

watchForCategory((): void => reset());

watch(currentCategoryId, () => {
  if (currentCategoryId.value) {
    setCategory(currentCategoryId.value);
  }
}, { immediate: true });

const addStatFilter = (stat: string, type: string) => {
  if (type === 'pros' && filters.value.pros.indexOf(stat) === -1) {
    filters.value.pros.push(stat);
  } else if (type === 'cons' && filters.value.cons.indexOf(stat) === -1) {
    filters.value.cons.push(stat);
  }
};
</script>
