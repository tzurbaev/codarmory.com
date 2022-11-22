import { defineStore } from 'pinia';
import { Weapon } from '@/weapons/types';
import weapons from '@/database/weapons.json';
import { useWeaponCategories } from '@/weapons/composables/categories';
import { useWeaponPlatforms } from '@/weapons/composables/platforms';

interface WeaponsState {
  weapons: Weapon[];
}

export const useWeaponsStore = defineStore({
  id: 'weapons',

  state: () => ({
    weapons,
  }) as WeaponsState,

  getters: {
    extendedWeapons(): Weapon[] {
      const { categories } = useWeaponCategories();
      const { platforms } = useWeaponPlatforms();

      return this.weapons.map((weapon: Weapon) => ({
        ...weapon,
        category: categories.value.find((category) => category.id === weapon.category_id),
        platform: weapon.platform_id !== null ? platforms.value.find((platform) => platform.id === weapon.platform_id) : null,
      }));
    },
  },
});
