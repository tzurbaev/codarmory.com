<template>
  <div v-if="weapon" class="space-y-8">
    <Panel>
      <WeaponCard type="page" :weapon="weapon" />
    </Panel>

    <Panel v-if="groups.length > 0" label="Attachments">
      <AttachmentsList :groups="groups" :with-category="true" />
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWeapon } from '@/weapons/composables/weapons';
import WeaponCard from '@/weapons/components/WeaponCard.vue';
import AttachmentsList from '@/attachments/components/AttachmentsList.vue';
import Panel from '@/layout/components/Panel.vue';

const props = defineProps<{
  weaponId: string;
}>();

const id = computed(() => props.weaponId);
const { weapon, groups } = useWeapon(id);
</script>
