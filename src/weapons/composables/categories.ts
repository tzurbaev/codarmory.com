import { computed, ComputedRef, Ref } from 'vue';
import { useCategoriesStore } from '@/weapons/stores/categories';
import { WeaponCategory } from '@/weapons/types';
import { MenuItem } from '@/layout/types';
import { SearchResult } from '@/search/types';

export function useWeaponCategory(id: ComputedRef<string | null>): { category: ComputedRef<WeaponCategory | null> } {
  const categoriesStore = useCategoriesStore();
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
  const categoriesStore = useCategoriesStore();
  const categories: ComputedRef<WeaponCategory[]> = computed(() => categoriesStore.categories);

  return { categories };
}

export function useWeaponCategoriesMenu(id: ComputedRef<string | null>): { menu: ComputedRef<MenuItem[]> } {
  const { categories } = useWeaponCategories();

  const menu: ComputedRef<MenuItem[]> = computed(() => {
    const items = categories.value.map((item: WeaponCategory) => ({
      id: `category-${item.id}`,
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
      id: 'all-weapons',
      name: 'All Weapons',
      active: id.value === null,
      route: { name: 'weapons.index' } as any,
    });

    return items;
  });

  return { menu };
}

export function useWeaponCategoriesSearch(query: Ref<string>) {
  const { categories } = useWeaponCategories();

  const results: ComputedRef<SearchResult[]> = computed(() => {
    if (query.value.length < 2) {
      return [];
    }

    const lowerCased = query.value.toLowerCase();

    return categories.value.filter((category: WeaponCategory) => {
      if (category.name.toLowerCase().includes(lowerCased)) {
        return true;
      } else if (category.alias && category.alias.toLowerCase().includes(lowerCased)) {
        return true;
      } else if (category.id.toLowerCase().includes(lowerCased)) {
        return true;
      }

      return false;
    }).map((category: WeaponCategory) => ({
      id: category.id,
      name: category.name,
      description: '',
      route: {
        name: 'weapons.index',
        params: {
          categoryId: category.id,
        },
      },
    }));
  });

  return {
    results,
  };
}
