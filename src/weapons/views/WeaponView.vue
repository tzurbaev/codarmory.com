<template>
  <div v-if="weapon" class="space-y-8">
    <div class="p-8 rounded-lg shadow-lg bg-gray-900">
      <WeaponCard type="page" :weapon="weapon" />
    </div>

    <div class="p-8 rounded-lg shadow-lg bg-gray-900">
      <AttachmentsList v-if="groups.length > 0" :groups="groups" />
    </div>
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
