<template>
  <DialogTitle as="h3" class="text-2xl sm:text-3xl font-extrabold leading-6 text-white">
    Path to <span class="text-primary-500">{{ weapon.name }}</span>
  </DialogTitle>
  <WeaponUnlockModalBody :weapon="weapon" />
</template>

<script setup lang="ts">
import { DialogTitle } from '@headlessui/vue';
import { Weapon } from '@/weapons/types';
import WeaponUnlockModalBody from './WeaponUnlockModalBody.vue';

defineProps<{
  weapon: Weapon;
}>();
</script>
