import { computed, ComputedRef } from 'vue';
import { Weapon } from '@/weapons/types';
import { useWeaponsStore } from '@/weapons/stores/weapons';
import { UnlockType } from '@/unlocks/types';
import { Attachment, AttachmentsGroup } from '@/attachments/types';
import { useAttachmentsStore } from '@/attachments/stores/attachments';
import {useAttachmentsGroups} from "@/attachments/composables/attachments";

const weaponsStore = useWeaponsStore();

function getParentWeapon(weapon: Weapon): Weapon | null {
  if (weapon.unlock_type !== UnlockType.Weapon) {
    return null;
  } else if (!weapon.unlock_id) {
    return null;
  }

  const index = weaponsStore.extendedWeapons.findIndex((item: Weapon) => item.id === weapon.unlock_id);

  if (index === -1) {
    return null;
  }

  return weaponsStore.extendedWeapons[index];
}

export function useWeaponsList(categoryId: ComputedRef<string | null>): { weapons: ComputedRef<Weapon[]> } {
  const transformed = computed(() => weaponsStore.extendedWeapons.map((weapon: Weapon) => ({
    ...weapon,
    parent: getParentWeapon(weapon),
  })));

  const weapons = computed(() => {
    if (categoryId.value === null) {
      return transformed.value;
    }

    return transformed.value.filter((weapon: Weapon) => weapon.category_id === categoryId.value);
  });

  return { weapons };
}

export function useWeapon(weaponId: ComputedRef<string | null>): { weapon: ComputedRef<Weapon | null>, groups: ComputedRef<AttachmentsGroup[]> } {
  const weapon: ComputedRef<Weapon | null> = computed(() => {
    if (!weaponId.value) {
      return null;
    }

    const index = weaponsStore.extendedWeapons.findIndex((item: Weapon) => item.id === weaponId.value);

    if (index === -1) {
      return null;
    }

    return {
      ...weaponsStore.extendedWeapons[index],
      parent: getParentWeapon(weaponsStore.extendedWeapons[index]),
    };
  });

  const attachments = computed(() => {
    if (!weapon.value || !weapon.value?.attachments || !weapon.value?.attachments.length) {
      return [];
    }

    return weapon.value.attachments;
  });

  const { groups } = useAttachmentsGroups(attachments);

  return {
    weapon,
    groups,
  };
}
