<template>
  <DialogTitle as="h3" class="text-2xl sm:text-3xl font-extrabold leading-6 text-white">
    Path to <span class="text-primary-500">{{ attachment.name }}</span>
  </DialogTitle>
  <template v-if="weapon">
    <WeaponUnlockModalBody :weapon="weapon"
                           mode="attachment"
                           :name="attachment.name"
    >
      <template v-slot:after-current="{ lastPosition }">
        <div class="p-3 rounded-md bg-primary-800">
          <div class="flex items-center gap-3">
            <div class="w-8">
              <p class="text-center text-white/60 text-5xl font-extrabold">{{ lastPosition }}</p>
            </div>
            <div>
              <p class="text-white/90 text-lg font-extrabold mb-2">
                <span>{{ attachment.name }}</span>
                <span class="sr-only">Current</span>
              </p>
              <AttachmentUnlockDescription :attachment="attachment" class="text-primary-100" />
            </div>
          </div>
        </div>
      </template>
    </WeaponUnlockModalBody>
  </template>
</template>

<script setup lang="ts">
import { DialogTitle } from '@headlessui/vue';
import { Attachment } from '@/attachments/types';
import { computed } from 'vue';
import { UnlockType } from '@/unlocks/types';
import { useWeapon } from '@/weapons/composables/weapons';
import WeaponUnlockModalBody from '@/unlocks/components/weapons/WeaponUnlockModalBody.vue';
import AttachmentUnlockDescription from '@/unlocks/components/attachments/AttachmentUnlockDescription.vue';

const props = defineProps<{
  attachment: Attachment;
}>();

const weaponId = computed(() => {
  if (props.attachment.unlock_type !== UnlockType.Weapon || !props.attachment.unlock_id) {
    return null;
  }

  return props.attachment.unlock_id;
});

const { weapon } = useWeapon(weaponId);
</script>
