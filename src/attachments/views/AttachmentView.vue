<template>
  <div v-if="attachment" class="space-y-8">
    <Panel>
      <AttachmentCard type="page" :attachment="attachment" />
    </Panel>

    <WeaponsList label="Weapons"
                 :attachment-id="id"
                 :with-category="true"
                 :static-filters="['attachment_id']"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useAttachment } from '@/attachments/composables/attachments';
import AttachmentCard from '@/attachments/components/AttachmentCard.vue';
import WeaponsList from '@/weapons/components/WeaponsList.vue';
import Panel from '@/layout/components/Panel.vue';
import { useHead } from '@vueuse/head';

const props = defineProps<{
  slug: string;
  attachmentId: string;
}>();

const id = computed(() => props.attachmentId);
const { attachment } = useAttachment(id);

watch(attachment, () => {
  if (attachment.value) {
    useHead({ title: `${attachment.value.name} – ${attachment.value.category?.name} – Attachments` });
  }
}, { immediate: true });
</script>
