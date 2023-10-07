<template>
  <div class="space-y-2 weapons-grid:space-y-4">
    <GameIcon :game="weapon.game_id" />

    <template v-if="type !== 'grid'">
      <p v-if="weapon.category" class="font-medium">
        <router-link :to="categoryRoute" class="text-primary-600 hover:text-primary-500 hover:underline">
          {{ weapon.category.name }}
        </router-link>
        <span v-if="weapon.platform" class="text-sm text-white/60"> &bull; {{ weapon.platform.name }}</span>
      </p>
      <h1 class="text-4xl sm:text-5xl font-extrabold text-white">
        {{ weapon.name }}
      </h1>
    </template>
    <template v-else>
      <div v-if="weapon.category || weapon.platform" class="xl:flex xl:gap-2 text-white/60">
        <p v-if="weapon.category">
          {{ weapon.category.name }}
        </p>
        <template v-if="weapon.platform">
          <span class="hidden xl:inline">&bull;</span>
          <p>{{ weapon.platform.name }}</p>
        </template>
      </div>
      <h2 class="text-4xl sm:text-5xl font-extrabold">
        <router-link :to="weaponRoute" class="text-white/90 hover:text-primary-500">
          {{ weapon.name }}
        </router-link>
      </h2>
    </template>
    <WeaponUnlockDescription :weapon="weapon" :full="type !== 'grid'" class="weapons-grid:align-bottom text-primary-500" />
    <p class="text-white/60">
      <template v-if="weapon.attachments.length > 0">
        {{ weapon.attachments.length }} Attachments
        <span>&bull;</span>
      </template>
      Max Level {{ weapon.max_level }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Weapon } from '@/weapons/types';
import { useWeaponRoutes } from '@/weapons/composables/weapons';
import WeaponUnlockDescription from '@/unlocks/components/weapons/WeaponUnlockDescription.vue';
import GameIcon from '@/games/components/GameIcon.vue';

const props = defineProps<{
  weapon: Weapon;
  type: string;
}>();

const { categoryRoute, weaponRoute } = useWeaponRoutes(computed(() => props.weapon));
</script>
