<template>
  <Navbar />
  <div class="pt-24 px-2 sm:px-6 lg:px-8 py-8">
    <router-view />
  </div>
  <UnlockModalsController />
  <SearchModal v-if="mounted" />
</template>

<script setup lang="ts">
import Navbar from '@/layout/components/Navbar.vue';
import UnlockModalsController from '@/unlocks/components/UnlockModalsController.vue';
import SearchModal from '@/search/components/SearchModal.vue';
import { onMounted, ref, Ref } from 'vue';

const mounted: Ref<boolean> = ref(false);

onMounted(() => {
  mounted.value = true;
});
</script>
