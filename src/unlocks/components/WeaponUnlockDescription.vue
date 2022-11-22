<template>
  <p>
    <template v-if="weapon.unlock_type === UnlockType.Auto">
      <span class="font-bold">{{ weapon.name }}</span> is a starting weapon.
    </template>
    <template v-else-if="weapon.unlock_type === UnlockType.Level">
      Reach <span class="font-bold">Rank {{ weapon.unlock_level }}</span> to unlock <span class="font-bold">{{ weapon.name }}</span>.
    </template>
    <template v-else-if="weapon.unlock_type === UnlockType.Weapon && weapon.parent">
      Reach <span class="font-bold">Level {{ weapon.unlock_level }}</span> with <span class="font-bold">{{ weapon.parent.name }}</span>
      to unlock <span class="font-bold">{{ weapon.name }}</span>.
    </template>
    <template v-else-if="weapon.unlock_type === UnlockType.BattlePass">
      Unlock by progressing in <span class="font-bold">Season 0{{ weapon.unlock_level}} Battle Pass</span>.
    </template>
    <template v-else-if="weapon.unlock_type === UnlockType.DMZ">
      <template v-if="weapon.unlock_description">{{ weapon.unlock_description }}</template>
      <template v-else>
        Unlock by playing <span class="font-bold">DMZ</span> mode.
      </template>
    </template>
  </p>
</template>

<script setup lang="ts">
import { UnlockType } from '@/unlocks/types';

defineProps<{
  weapon: any;
}>();
</script>
