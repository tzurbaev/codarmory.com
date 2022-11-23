<template>
  <div class="space-y-4 mt-2">
    <p v-if="parent.length > 0 || mode === 'attachment'" class="text-white/90">
      You need to unlock and level
      <template v-if="totalCount === 1">one weapon</template>
      <template v-else>{{ totalCount }} weapons</template>
      before you can use <span class="font-bold">{{ name || weapon.name }}</span>.
    </p>
    <WeaponUnlockModalCard v-for="(item, index) in parent"
                           :key="`Weapon-${weapon.id}-ParentUnlock-${item.id}`"
                           :weapon="item"
                           :position="index + 1"
    />

    <WeaponUnlockModalCard :weapon="weapon" :current="mode !== 'attachment'" :position="parent.length + 1" />

    <slot name="after-current" :last-position="parent.length + 2" />
  </div>

  <div v-if="mode !== 'attachment' && children.length > 0" class="mt-8">
    <h4 class="text-2xl sm:text-3xl font-extrabold leading-6 text-white">Available Next</h4>
    <div class="space-y-4 mt-2">
      <p class="text-white/90">
        You can unlock
        <template v-if="children.length === 1">one more weapon</template>
        <template v-else>{{ children.length }} more weapons</template>
        with <span class="font-bold">{{ weapon.name }}</span>.
      </p>

      <WeaponUnlockModalCard v-for="(item, index) in children"
                             :key="`Weapon-${weapon.id}-ChildrenUnlock-${item.id}`"
                             :weapon="item"
                             :last="index === children.length - 1"
                             :position="parent.length + 2 + index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Weapon } from '@/weapons/types';
import { useWeaponUnlockPath } from '@/weapons/composables/weapons';
import { computed } from 'vue';
import WeaponUnlockModalCard from '@/unlocks/components/weapons/WeaponUnlockModalCard.vue';

const props = defineProps<{
  weapon: Weapon;
  mode?: string;
  name?: string;
}>();

const { parent, children } = useWeaponUnlockPath(computed(() => props.weapon));
const totalCount = computed(() => {
  if (props.mode === 'attachment') {
    return parent.value.length + 1;
  }

  return parent.value.length;
});
</script>
