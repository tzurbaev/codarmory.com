<template>
  <div class="p-3 rounded-md" :class="[current ? 'bg-primary-800' : 'bg-gray-800']">
    <div class="flex items-center gap-3">
      <div class="w-8">
        <p class="text-center text-white/60 text-5xl font-extrabold">{{ position }}</p>
      </div>
      <div>
        <p class="text-lg font-extrabold mb-2">
          <router-link :to="weaponRoute"
                       class="text-white/90 hover:underline"
                       :class="[current ? 'hover:text-primary-100' : 'hover:text-primary-500']"
          >
            {{ weapon.name }}
          </router-link>
          <span v-if="current" class="sr-only">Current</span>
        </p>
        <WeaponUnlockDescription :weapon="weapon" :class="[current ? 'text-primary-100' : 'text-primary-500']" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Weapon } from '@/weapons/types';
import WeaponUnlockDescription from '@/unlocks/components/weapons/WeaponUnlockDescription.vue';
import { useWeaponRoutes } from '@/weapons/composables/weapons';
import { computed } from 'vue';

const props = defineProps<{
  weapon: Weapon;
  current?: boolean;
  last?: boolean;
  position: number;
}>();

const { weaponRoute } = useWeaponRoutes(computed(() => props.weapon));
</script>
