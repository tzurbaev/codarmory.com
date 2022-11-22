<template>
  <div class="p-8 rounded-lg shadow-lg hover:shadow-xl bg-gray-900 flex flex-col">
    <div class="flex-1">
      <p v-if="weapon.category" class="font-medium text-gray-400">
        {{ weapon.category.name }}
      </p>
      <h2 class="text-5xl font-extrabold">
        <router-link :to="{ name: 'weapons.show', params: { categoryId: weapon.category_id, weaponId: weapon.id } }"
                     class="text-white/90 hover:text-primary-500"
        >
          {{ weapon.name }}
        </router-link>
      </h2>
      <p v-if="weapon.attachments.length > 0" class="text-gray-400">
        {{ weapon.attachments.length }} Attachments
      </p>
    </div>
    <WeaponUnlockDescription :weapon="weapon" class="align-bottom mt-4 text-primary-500/80" />
  </div>
</template>

<script setup lang="ts">
import { Weapon } from '@/weapons/types';
import WeaponUnlockDescription from '@/unlocks/components/WeaponUnlockDescription.vue';

defineProps<{
  weapon: Weapon;
}>();
</script>
