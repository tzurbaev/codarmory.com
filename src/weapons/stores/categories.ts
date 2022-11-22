import { defineStore } from 'pinia';
import categories from '@/database/categories.json';
import { WeaponCategory } from '@/weapons/types';

interface WeaponCategoriesState {
  categories: WeaponCategory[];
}

export const useCategoriesStore = defineStore({
  id: 'weapons:categories',

  state: () => ({
    categories,
  }) as WeaponCategoriesState,
});
