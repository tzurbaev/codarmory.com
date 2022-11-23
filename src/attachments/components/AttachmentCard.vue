<template>
  <div>
    <template v-if="type !== 'grid'">
      <p v-if="attachment.category" class="font-medium">
        <router-link :to="categoryRoute" class="text-primary-600 hover:text-primary-500 hover:underline">
          {{ attachment.category.name }}
        </router-link>
      </p>
      <h1 class="text-5xl font-extrabold text-white leading-normal">{{ attachment.name }}</h1>
    </template>
    <template v-else>
      <h4 class="font-extrabold text-2xl">
        <router-link :to="attachmentRoute" class="text-white/90 hover:text-primary-500">
          {{ attachment.name }}
        </router-link>
      </h4>
    </template>

    <AttachmentUnlockDescription :attachment="attachment" class="text-primary-500 attachments-grid:text-sm" />
    <p v-if="attachment.description" class="mt-4 attachments-grid:mt-2 attachments-grid:text-xs text-white/60">
      {{ attachment.description }}
    </p>

    <div v-if="hasStats" class="mt-8 attachments-grid:mt-4 grid grid-cols-1 sm:grid-cols-2 attachments-grid:grid-cols-1 max-w-2xl attachments-grid:max-w-auto gap-8 attachments-grid:gap-4">
      <div>
        <h3 class="text-green-500 text-base attachments-grid:text-xs font-bold">Pros</h3>
        <ul class="list-inside">
          <li v-for="stat in attachment.stats.pros"
              :key="`AttachmentGridCard-${attachment.id}-Pros-${stat.id}`"
              class="text-green-500 text-lg attachments-grid:text-sm"
          >
            {{ stat.name }}
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-red-500 text-base attachments-grid:text-xs font-bold">Cons</h3>
        <ul class="list-inside">
          <li v-for="stat in attachment.stats.cons"
              :key="`AttachmentGridCard-${attachment.id}-Pros-${stat.id}`"
              class="text-red-500 text-lg attachments-grid:text-sm"
          >
            {{ stat.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Attachment } from '@/attachments/types';
import AttachmentUnlockDescription from '@/unlocks/components/AttachmentUnlockDescription.vue';
import { computed, ComputedRef } from 'vue';

const props = defineProps<{
  attachment: Attachment;
  type: string;
}>();

const categoryRoute = computed(() => {
  if (!props.attachment.category) {
    return null;
  }

  return {
    name: 'attachments.index',
    params: {
      categoryId: props.attachment.category.id,
    },
  };
});

const attachmentRoute = computed(() => ({
  name: 'attachments.show',
  params: {
    categoryId: props.attachment.category ? props.attachment.category.id : props.attachment.category_id,
    slug: props.attachment.slug,
    attachmentId: props.attachment.id,
  },
}));

const hasStats: ComputedRef<boolean> = computed(() => {
  if (!props.attachment.stats) {
    return false;
  }

  return props.attachment.stats.pros.length > 0 || props.attachment.stats.cons.length > 0;
});
</script>
