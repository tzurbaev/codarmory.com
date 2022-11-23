<template>
  <div>
    <Modal v-if="isActive" :open="isOpen" @close="close()">
      <WeaponUnlockModal v-if="type === 'weapon' && weapon" :weapon="weapon" />
      <AttachmentUnlockModal v-else-if="type === 'attachment' && attachment" :attachment="attachment" />
      <button type="button"
              class="block sm:hidden mt-4 font-medium w-full text-center bg-primary-500 text-white rounded-lg p-3"
              @click="close()"
      >
        Close
      </button>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useUnlockModal } from '@/unlocks/composables/unlocks';
import WeaponUnlockModal from '@/unlocks/components/weapons/WeaponUnlockModal.vue';
import AttachmentUnlockModal from '@/unlocks/components/attachments/AttachmentUnlockModal.vue';
import Modal from '@/layout/components/Modal.vue';

const {
  isActive,
  isOpen,
  type,
  weapon,
  attachment,
  close,
} = useUnlockModal();
</script>
