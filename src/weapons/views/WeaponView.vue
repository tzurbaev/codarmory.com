<template>
  <div v-if="weapon" class="p-8 rounded-lg shadow-lg hover:shadow-xl bg-gray-900">
    <WeaponCard :weapon="weapon" />

    <AttachmentsList v-if="groups.length > 0" class="mt-8" :groups="groups" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWeapon } from '@/weapons/composables/weapons';
import WeaponCard from '@/weapons/components/WeaponCard.vue';
import AttachmentsList from '@/attachments/components/AttachmentsList.vue';

const props = defineProps<{
  weaponId: string;
}>();

const id = computed(() => props.weaponId);
const { weapon, groups } = useWeapon(id);
</script>
