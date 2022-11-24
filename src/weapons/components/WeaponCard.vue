<template>
  <div class="space-y-2 weapons-grid:space-y-4">
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
      <div v-if="weapon.category || weapon.platform" class="lg:flex lg:flex-col">
        <p v-if="weapon.category" class="font-medium text-white/60">
          {{ weapon.category.name }}
        </p>
        <p v-if="weapon.platform" class="text-white/60">
          <span class="lg:hidden">&bull;</span>
          {{ weapon.platform.name }}
        </p>
      </div>
      <h2 class="text-4xl sm:text-5xl font-extrabold">
        <router-link :to="weaponRoute" class="text-white/90 hover:text-primary-500">
          {{ weapon.name }}
        </router-link>
      </h2>
    </template>
    <WeaponUnlockDescription :weapon="weapon" class="weapons-grid:align-bottom text-primary-500" />
    <p v-if="weapon.attachments.length > 0" class="text-white/60">
      {{ weapon.attachments.length }} Attachments
    </p>
  </div>
</template>

<script setup lang="ts">
import { Weapon } from '@/weapons/types';
import { computed } from 'vue';
import WeaponUnlockDescription from '@/unlocks/components/weapons/WeaponUnlockDescription.vue';
import { useWeaponRoutes } from '@/weapons/composables/weapons';

const props = defineProps<{
  weapon: Weapon;
  type: string;
}>();

const { categoryRoute, weaponRoute } = useWeaponRoutes(computed(() => props.weapon));
</script>
