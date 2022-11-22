<template>
  <div class="border border-gray-700 rounded-md p-3 flex flex-col">
    <div class="flex-1">
      <h4 class="font-bold text-lg text-white">{{ attachment.name }}</h4>
      <div class="space-y-2">
        <p v-if="attachment.description" class="text-sm text-gray-400">{{ attachment.description }}</p>
      </div>
      <div v-if="hasStats" class="mt-4 grid grid-cols-2 gap-2">
        <div>
          <p class="font-bold text-sm text-green-500">Pros</p>
          <ul class="list-inside">
            <li v-for="stat in attachment.stats.pros"
                :key="`AttachmentGridCard-${attachment.id}-Pros-${stat.id}`"
                class="text-green-500 text-xs"
            >
              + {{ stat.name }}
            </li>
          </ul>
        </div>
        <div>
          <p class="font-bold text-sm text-red-500">Cons</p>
          <ul class="list-inside">
            <li v-for="stat in attachment.stats.cons"
                :key="`AttachmentGridCard-${attachment.id}-Cons-${stat.id}`"
                class="text-red-500 text-xs"
            >
              - {{ stat.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <AttachmentUnlockDescription :attachment="attachment" class="text-purple-500/60 text-sm align-bottom mt-4" />
  </div>
</template>

<script setup lang="ts">
import { Attachment } from '@/attachments/types';
import { computed, ComputedRef } from 'vue';
import AttachmentUnlockDescription from '@/unlocks/components/AttachmentUnlockDescription.vue';

const props = defineProps<{
  attachment: Attachment;
}>();

const hasStats: ComputedRef<boolean> = computed(() => {
  if (!props.attachment.stats) {
    return false;
  }

  return props.attachment.stats.pros.length > 0 || props.attachment.stats.cons.length > 0;
});
</script>
