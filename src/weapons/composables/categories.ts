import { computed, ComputedRef } from 'vue';
import { useCategoriesStore } from '@/weapons/stores/categories';
import { WeaponCategory } from '@/weapons/types';

const categoriesStore = useCategoriesStore();

export function useWeaponCategory(id: ComputedRef<string | null>): { category: ComputedRef<WeaponCategory | null> } {
  const category: ComputedRef<WeaponCategory | null> = computed(() => {
    if (!id.value) {
      return null;
    }

    const index = categoriesStore.categories.findIndex((item: WeaponCategory) => item.id === id.value);

    if (index === -1) {
      return null;
    }

    return categoriesStore.categories[index];
  });

  return { category };
}

export function useWeaponCategories(): { categories: ComputedRef<WeaponCategory[]> } {
  const categories: ComputedRef<WeaponCategory[]> = computed(() => categoriesStore.categories);

  return { categories };
}

export function useWeaponCategoriesMenu(id: ComputedRef<string | null>): { menu: ComputedRef<any[]> } {
  const { categories } = useWeaponCategories();

  const menu = computed(() => {
    const items = categories.value.map((item: WeaponCategory) => ({
      name: item.name,
      active: id.value === item.id,
      route: {
        name: 'weapons.index',
        params: {
          categoryId: item.id,
        },
      } as any,
    }));

    items.unshift({
      name: 'All Weapons',
      active: id.value === null,
      route: { name: 'weapons.index' } as any,
    });

    return items;
  });

  return { menu };
}
