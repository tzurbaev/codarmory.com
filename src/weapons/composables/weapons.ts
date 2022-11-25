import {
  computed, ComputedRef, ref, Ref, watch,
} from 'vue';
import {StaticWeaponsFilters, Weapon, WeaponCategory, WeaponsFilters} from '@/weapons/types';
import { useWeaponsStore } from '@/weapons/stores/weapons';
import { UnlockType } from '@/unlocks/types';
import { AttachmentsGroup } from '@/attachments/types';
import { useAttachmentsGroups } from '@/attachments/composables/attachments';
import { getFilteredRecords } from '@/database/criteria';
import {
  getWeaponAttachmentCriterion,
  getWeaponCategoryCriterion,
  getWeaponPlatformCriterion,
  getWeaponSearchCriterion,
} from '@/weapons/composables/criteria';

function getParentWeapon(weapon: Weapon): Weapon | null {
  const weaponsStore = useWeaponsStore();

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

export function useWeaponsFilters() {
  const filters: Ref<WeaponsFilters> = ref({
    search: null,
    platform_id: null,
  });

  const reset = () => {
    filters.value.search = '';
    filters.value.platform_id = null;
  };

  const hasFilters = computed(() => !!filters.value.search || !!filters.value.platform_id);

  return {
    filters,
    reset,
    hasFilters,
  };
}

export function useWeaponsList(
  staticFilters?: Ref<StaticWeaponsFilters>,
  filters?: Ref<WeaponsFilters>,
): { categories: ComputedRef<WeaponCategory[]>, weapons: ComputedRef<Weapon[]> } {
  const weaponsStore = useWeaponsStore();
  const transformed = computed(() => {
    const list = weaponsStore.extendedWeapons.map((weapon: Weapon) => ({
      ...weapon,
      parent: getParentWeapon(weapon),
    }));

    if (!staticFilters || !staticFilters.value) {
      return list;
    }

    return getFilteredRecords(list, [
      getWeaponCategoryCriterion(staticFilters.value.category_id),
      getWeaponAttachmentCriterion(staticFilters.value.attachment_id),
    ]);
  });

  const categories = computed(() => {
    const items: WeaponCategory[] = [];

    transformed.value.forEach((weapon: Weapon) => {
      if (weapon.category && items.indexOf(weapon.category) === -1) {
        items.push(weapon.category);
      }
    });

    return items;
  });

  const weapons = computed(() => {
    if (!filters || !filters.value) {
      return transformed.value;
    }

    return getFilteredRecords(transformed.value, [
      getWeaponPlatformCriterion(filters.value.platform_id),
      getWeaponSearchCriterion(filters.value.search),
    ]);
  });

  return { categories, weapons };
}

export function useWeapon(weaponId: ComputedRef<string | null>): { weapon: ComputedRef<Weapon | null>, groups: ComputedRef<AttachmentsGroup[]> } {
  const weaponsStore = useWeaponsStore();
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

export function useWeaponUnlockPath(weapon: ComputedRef<Weapon | null>) {
  const parent: Ref<Weapon[]> = ref([]);
  const children: Ref<Weapon[]> = ref([]);
  const { weapons } = useWeaponsList();

  const findParent = (id: string | null) => {
    if (!id) {
      return;
    }

    const parentItem = weapons.value.find((item: Weapon) => item.id === id);

    if (!parentItem) {
      return;
    }

    parent.value.unshift(parentItem);

    if (parentItem.unlock_type === UnlockType.Weapon) {
      findParent(parentItem.unlock_id);
    }
  };

  const findChildren = (id: string | null) => {
    if (!id) {
      return;
    }

    const childrenItems = weapons.value.filter((item: Weapon) => item.unlock_id === id);

    if (!childrenItems.length) {
      return;
    }

    childrenItems.forEach((child: Weapon) => {
      children.value.push(child);
      findChildren(child.id);
    });
  };

  const generate = () => {
    parent.value = [];
    children.value = [];

    if (!weapon.value) {
      return;
    }

    findParent(weapon.value.unlock_id);
    findChildren(weapon.value.id);
  };

  watch(weapon, () => generate(), { immediate: true });

  return { parent, children };
}

export function useWeaponRoutes(weapon: ComputedRef<Weapon>) {
  const categoryRoute = computed(() => ({
    name: 'weapons.index',
    params: {
      categoryId: weapon.value.category?.id,
    },
  }));

  const weaponRoute = computed(() => ({
    name: 'weapons.show',
    params: {
      categoryId: weapon.value.category ? weapon.value.category.id : weapon.value.category_id,
      weaponId: weapon.value.id,
    },
  }));

  return {
    categoryRoute,
    weaponRoute,
  };
}
