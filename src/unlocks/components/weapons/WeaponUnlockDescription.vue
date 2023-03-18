<template>
  <p>
    <a href="javascript:;"
       class="border-b border-transparent hover:border-dotted hover:border-primary-500"
       @click="openWeapon(weapon)"
    >
      <template v-if="weapon.unlock_type === UnlockType.Auto">
        <span class="font-bold">{{ weapon.name }}</span> is a starting weapon
      </template>
      <template v-else-if="weapon.unlock_type === UnlockType.Level">
        Reach <span class="font-bold">Rank {{ weapon.unlock_level }}</span>
      </template>
      <template v-else-if="weapon.unlock_type === UnlockType.Weapon && weapon.parent">
        Reach <span class="font-bold">Level {{ weapon.unlock_level }}</span> with <span class="font-bold">{{ weapon.parent.name }}</span>
      </template>
      <template v-else-if="weapon.unlock_type === UnlockType.BattlePass">
        <template v-if="full && weapon.unlock_id">
          Unlock by completing <span class="font-bold">Section {{ weapon.unlock_id}}'s HVT</span>
          in <span class="font-bold">Season 0{{ weapon.unlock_level}} Battle Pass</span>
        </template>
        <template v-else>
          Unlock in <span class="font-bold">Season 0{{ weapon.unlock_level}} Battle Pass</span>
        </template>
      </template>
      <template v-else-if="weapon.unlock_type === UnlockType.Bundle">
        Unlock by purchasing
        <span v-if="full && weapon.unlock_id" class="font-bold">{{ weapon.unlock_id }}</span>
        bundle in game store.
      </template>
      <template v-else-if="weapon.unlock_type === UnlockType.Challenge">
        <template v-if="full && weapon.unlock_description">
          {{ weapon.unlock_description }}
        </template>
        <template v-else>Unlock by completing challenge.</template>
      </template>
      <template v-else-if="weapon.unlock_type === UnlockType.OneOfChallenge">
        <template v-if="full && weapon.unlock_description">
          Complete one of the following:
          <br>
          <span class="font-semibold" v-html="weapon.unlock_description.replaceAll(`\n`, '<br>')" />
        </template>
        <template v-else>Unlock by completing one of {{ weapon.unlock_level }} challenges.</template>
      </template>
      <template v-else-if="weapon.unlock_type === UnlockType.DMZ">
        <template v-if="full && weapon.unlock_description">{{ weapon.unlock_description }}</template>
        <template v-else>
          Unlock by playing <span class="font-bold">DMZ</span> mode
        </template>
      </template>
    </a>
  </p>
</template>

<script setup lang="ts">
import { UnlockType } from '@/unlocks/types';
import { useUnlockModal } from '@/unlocks/composables/unlocks';

defineProps<{
  weapon: any;
  full?: boolean;
}>();

const { openWeapon } = useUnlockModal();
</script>
