<template>
  <Navbar />
  <div class="pt-24 px-2 sm:px-6 lg:px-8 py-8">
    <router-view />
  </div>
  <UnlockModalsController />
</template>

<script setup lang="ts">
import Navbar from '@/layout/components/Navbar.vue';
import UnlockModalsController from '@/unlocks/components/UnlockModalsController.vue';
</script>
