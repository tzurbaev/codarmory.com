<template>
  <div>
    <p v-if="weapon.category" class="font-medium">
      <router-link :to="categoryRoute" class="text-primary-600 hover:text-primary-500 hover:underline">
        {{ weapon.category.name }}
      </router-link>
    </p>
    <h1 class="text-5xl font-extrabold text-white">{{ weapon.name }}</h1>
    <p v-if="weapon.attachments.length > 0" class="text-gray-400">
      {{ weapon.attachments.length }} Attachments
    </p>
    <WeaponUnlockDescription :weapon="weapon" class="mt-4 text-primary-500/80" />
  </div>
</template>

<script setup lang="ts">
import { Weapon } from '@/weapons/types';
import { computed } from 'vue';
import WeaponUnlockDescription from '@/unlocks/components/WeaponUnlockDescription.vue';

const props = defineProps<{
  weapon: Weapon;
}>();

const categoryRoute = computed(() => ({
  name: 'weapons.index',
  params: {
    categoryId: props.weapon.category?.id,
  },
}));
</script>
