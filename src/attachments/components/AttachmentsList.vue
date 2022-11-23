<template>
  <div>
    <AttachmentsCategorySelector :groups="groups" v-model="category" @select="setCategory" />

    <div v-if="group" class="mt-4">
      <h3 class="font-extrabold text-3xl text-white">{{ group.category.name }}</h3>
      <p class="text-gray-400 text-sm">
        <template v-if="group.attachments.length !== attachments.length">
          Displaying {{ attachments.length }} attachments
          out of {{ group.attachments.length }}
        </template>
        <template v-else>{{ attachments.length }} attachments</template>
      </p>

      <div class="mt-4 grid grid-cols-1 sm:grid-cols-8 2xl:grid-cols-6 gap-6">
        <div class="col-span-1 sm:col-span-2 2xl:col-span-1">
          <div class="space-y-4 lg:sticky lg:top-[10%]">
            <AttachmentsFiltersForm :pros="pros" :cons="cons" :has-filters="hasFilters" v-model="filters" @reset="reset" />
          </div>
        </div>
        <div class="col-span-1 sm:col-span-6 2xl:col-span-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-4 attachments-grid">
            <div v-for="attachment in attachments"
                 :key="`AttachmentGridCard-${attachment.id}`"
                 class="border border-gray-700 rounded-md p-3"
            >
              <AttachmentCard type="grid" :attachment="attachment" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AttachmentsGroup } from '@/attachments/types';
import AttachmentsCategorySelector from '@/attachments/components/AttachmentsCategorySelector.vue';
import { useCategoryAttachments, useFilteredAttachments } from '@/attachments/composables/attachments';
import { computed } from 'vue';
import AttachmentCard from '@/attachments/components/AttachmentCard.vue';
import AttachmentsFiltersForm from '@/attachments/components/AttachmentsFiltersForm.vue';

const props = defineProps<{
  groups: AttachmentsGroup[];
}>();

const currentGroups = computed(() => props.groups);
const {
  category, group, setCategory, watchForCategory,
} = useCategoryAttachments(currentGroups);
const {
  filters, reset, hasFilters, pros, cons, attachments,
} = useFilteredAttachments(group);
watchForCategory((): void => reset());
</script>
