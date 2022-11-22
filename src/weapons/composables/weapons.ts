import {computed, ComputedRef} from 'vue';
import {Weapon, WeaponAttachmentsList} from '@/weapons/types';
import {useWeaponsStore} from '@/weapons/stores/weapons';
import {UnlockType} from '@/unlocks/types';
import {Attachment} from '@/attachments/types';
import {useAttachmentsStore} from '@/attachments/stores/attachments';

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

export function useWeapon(weaponId: ComputedRef<string | null>): { weapon: ComputedRef<Weapon | null>, attachments: ComputedRef<WeaponAttachmentsList[]> } {
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

  const attachmentsStore = useAttachmentsStore();

  const ungrouppedAttachments: ComputedRef<Attachment[]> = computed(() => {
    if (!weapon.value || !weapon.value?.attachments || !weapon.value?.attachments.length) {
      return [];
    }

    return attachmentsStore.extendedAttachments.filter((attachment: Attachment) => weapon.value?.attachments.indexOf(attachment.id) !== -1);
  });

  const attachments: ComputedRef<WeaponAttachmentsList[]> = computed(() => {
    if (!ungrouppedAttachments.value.length) {
      return [];
    }

    const groups: WeaponAttachmentsList[] = [];
    const indexes: any = {};

    ungrouppedAttachments.value.forEach((attachment: Attachment) => {
      if (!attachment.category || !attachment.category.id) {
        return;
      } else if (typeof indexes[attachment.category.id] !== 'undefined') {
        groups[indexes[attachment.category.id]].attachments.push(attachment);

        return;
      }

      indexes[attachment.category.id] = groups.push({
        category: attachment.category,
        attachments: [attachment],
      }) - 1;
    });

    return groups;
  });

  return {
    weapon,
    attachments,
  };
}
