<template>
  <div v-if="attachment" class="p-8 rounded-lg shadow-lg hover:shadow-xl bg-gray-900">
    <AttachmentCard type="page" :attachment="attachment" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAttachment } from '@/attachments/composables/attachments';
import AttachmentCard from '@/attachments/components/AttachmentCard.vue';

const props = defineProps<{
  slug: string;
  attachmentId: string;
}>();

const id = computed(() => props.attachmentId);
const { attachment } = useAttachment(id);
</script>
