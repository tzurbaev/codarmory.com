<template>
  <p>
    <a href="javascript:;"
       class="border-b border-transparent hover:border-dotted hover:border-primary-500"
       @click="openAttachment(attachment)"
    >
      <template v-if="attachment.unlock_type === UnlockType.Auto">
        <span class="font-bold">{{ attachment.name }}</span> is a starting attachment
      </template>
      <template v-else-if="attachment.unlock_type === UnlockType.Level">
        Reach <span class="font-bold">Rank {{ attachment.unlock_level }}</span>
      </template>
      <template v-else-if="attachment.unlock_type === UnlockType.Weapon && attachment.weapon">
        Reach <span class="font-bold">Level {{ attachment.unlock_level }}</span> with <span class="font-bold">{{ attachment.weapon.name }}</span>
      </template>
      <template v-else-if="attachment.unlock_type === UnlockType.BattlePass">
        Unlock by progressing in <span class="font-bold">Season 0{{ attachment.unlock_level}} Battle Pass</span>
      </template>
      <template v-else-if="attachment.unlock_type === UnlockType.Bundle">
        Unlock by purchasing
        <span v-if="full && attachment.unlock_id" class="font-bold">{{ attachment.unlock_id }}</span>
        bundle in store.
      </template>
      <template v-else-if="attachment.unlock_type === UnlockType.Challenge">
        <template v-if="full && attachment.unlock_description">
          {{ attachment.unlock_description }}
        </template>
        <template v-else>Unlock by completing challenge.</template>
      </template>
      <template v-else-if="attachment.unlock_type === UnlockType.DMZ">
        <template v-if="attachment.unlock_description">{{ attachment.unlock_description }}</template>
        <template v-else>
          Unlock by playing <span class="font-bold">DMZ</span> mode
        </template>
      </template>
      <template v-else-if="attachment.unlock_type === UnlockType.Unknown">
        <template v-if="full">
          This attachment's requirements are not known. It might be already unlocked for you, though.
        </template>
        <template v-else>
          Unknown requirements
        </template>
      </template>
      <template v-else-if="attachment.unlock_type === UnlockType.NotAvailable">
        This attachment is not yet available in game
        <template v-if="full">
          even if it listed in progression or attachments UI.
        </template>
      </template>
    </a>
  </p>
</template>

<script setup lang="ts">
import { UnlockType } from '@/unlocks/types';
import { Attachment } from '@/attachments/types';
import { useUnlockModal } from '@/unlocks/composables/unlocks';

defineProps<{
  attachment: Attachment;
  full?: boolean;
}>();

const { openAttachment } = useUnlockModal();
</script>
