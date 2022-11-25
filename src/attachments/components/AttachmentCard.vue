<template>
  <div class="space-y-8">
    <div class="space-y-2">
      <template v-if="type !== 'grid'">
        <p v-if="attachment.category" class="font-medium">
          <router-link :to="categoryRoute" class="text-primary-600 hover:text-primary-500 hover:underline">
            {{ attachment.category.name }}
          </router-link>
        </p>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-white">{{ attachment.name }}</h1>
      </template>
      <template v-else>
        <h4 class="font-extrabold text-2xl">
          <router-link :to="attachmentRoute" class="text-white/90 hover:text-primary-500">
            {{ attachment.name }}
          </router-link>
        </h4>
      </template>

      <AttachmentUnlockDescription :attachment="attachment" class="text-primary-500 attachments-grid:text-sm" />

      <p v-if="attachment.description" class="attachments-grid:text-xs text-white/60">
        {{ attachment.description }}
      </p>
    </div>

    <div v-if="hasStats" class="grid grid-cols-1 sm:grid-cols-2 attachments-grid:grid-cols-1 max-w-2xl attachments-grid:max-w-auto gap-8 attachments-grid:gap-4">
      <div v-if="attachment.stats.pros.length > 0">
        <h3 class="text-green-500 text-base attachments-grid:text-xs font-bold">Pros</h3>
        <ul class="list-inside">
          <li v-for="stat in attachment.stats.pros"
              :key="`AttachmentGridCard-${attachment.id}-Pros-${stat.id}`"
              class="text-green-500 text-lg attachments-grid:text-sm"
          >
            <template v-if="type !== 'grid'">
              {{ stat.name }}
            </template>
            <template v-else>
              <a href="javascript:;" class="hover:underline" @click="$emit('stat', stat.id, 'pros')">{{ stat.name }}</a>
            </template>
          </li>
        </ul>
      </div>
      <div v-if="attachment.stats.cons.length > 0">
        <h3 class="text-red-500 text-base attachments-grid:text-xs font-bold">Cons</h3>
        <ul class="list-inside">
          <li v-for="stat in attachment.stats.cons"
              :key="`AttachmentGridCard-${attachment.id}-Pros-${stat.id}`"
              class="text-red-500 text-lg attachments-grid:text-sm"
          >
            <template v-if="type !== 'grid'">
              {{ stat.name }}
            </template>
            <template v-else>
              <a href="javascript:;" class="hover:underline" @click="$emit('stat', stat.id, 'cons')">{{ stat.name }}</a>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Attachment } from '@/attachments/types';
import AttachmentUnlockDescription from '@/unlocks/components/attachments/AttachmentUnlockDescription.vue';
import { computed } from 'vue';
import { useAttachmentRoutes } from '@/attachments/composables/attachments';

const props = defineProps<{
  attachment: Attachment;
  type: string;
}>();

defineEmits(['stat']);

const { categoryRoute, attachmentRoute } = useAttachmentRoutes(computed(() => props.attachment));
const hasStats = computed(() => {
  if (!props.attachment.stats) {
    return false;
  }

  return props.attachment.stats.pros.length > 0 || props.attachment.stats.cons.length > 0;
});
</script>
