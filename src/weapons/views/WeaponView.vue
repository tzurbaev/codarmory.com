<template>
  <div v-if="weapon" class="space-y-8">
    <Panel>
      <WeaponCard type="page" :weapon="weapon" />
    </Panel>

    <Panel v-if="groups.length > 0" label="Attachments">
      <AttachmentsList :groups="groups" :with-category="true" :with-game="false" />
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useWeapon } from '@/weapons/composables/weapons';
import WeaponCard from '@/weapons/components/WeaponCard.vue';
import AttachmentsList from '@/attachments/components/AttachmentsList.vue';
import Panel from '@/layout/components/Panel.vue';
import { useHead } from '@vueuse/head';

const props = defineProps<{
  weaponId: string;
}>();

const id = computed(() => props.weaponId);
const { weapon, groups } = useWeapon(id);

watch(weapon, () => {
  if (weapon.value) {
    useHead({ title: `${weapon.value.name} – ${weapon.value.category?.name} – Weapons` });
  }
}, { immediate: true });
</script>
