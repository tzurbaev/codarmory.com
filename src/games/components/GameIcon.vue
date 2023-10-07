<template>
  <div class="flex items-center gap-2">
    <img :src="gameIcons[game]"
         :alt="games[game]"
         :title="games[game]"
         :class="[compact ? 'h-2' : 'h-4']"
    >
  </div>
</template>

<script setup lang="ts">
import { Game } from '@/games/types';
import { gameIcons, games } from '@/games/composables/games';

defineProps<{
  game: Game;
  compact?: boolean;
}>();
</script>
