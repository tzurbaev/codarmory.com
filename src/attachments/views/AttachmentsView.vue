<template>
  <Panel label="Attachments">
    <AttachmentsList :groups="groups" />
  </Panel>
</template>

<script setup lang="ts">
import Panel from '@/layout/components/Panel.vue';
import { getAttachmentsList } from '@/attachments/composables/attachments';
import AttachmentsList from '@/attachments/components/AttachmentsList.vue';

const { groups } = getAttachmentsList();
</script>
