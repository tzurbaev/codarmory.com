<template>
  <div v-if="attachment">
    <div class="p-8 rounded-lg shadow-lg hover:shadow-xl bg-gray-900">
      <AttachmentCard type="page" :attachment="attachment" />
    </div>

    <div class="mt-8">
      <h2 class="text-3xl font-extrabold text-white/80 leading-normal">Weapons</h2>
      <WeaponsList :attachment-id="id" :without-menu="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAttachment } from '@/attachments/composables/attachments';
import AttachmentCard from '@/attachments/components/AttachmentCard.vue';
import WeaponsList from '@/weapons/components/WeaponsList.vue';

const props = defineProps<{
  slug: string;
  attachmentId: string;
}>();

const id = computed(() => props.attachmentId);
const { attachment } = useAttachment(id);
</script>
