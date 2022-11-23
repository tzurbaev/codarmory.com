import { Router } from 'vue-router';
import { ref, Ref, watch } from 'vue';
import { MenuItem } from '@/layout/types';

export function useMobileMenuNavigation(router: Router, menu: MenuItem[]) {
  const selected: Ref<string | null> = ref(null);
  const initialIndex = menu.findIndex((item: MenuItem) => item.active);

  if (initialIndex !== -1) {
    selected.value = menu[initialIndex].id;
  }

  watch(selected, async () => {
    const index = menu.findIndex((item: MenuItem) => item.id === selected.value);

    if (index === -1) {
      return;
    }

    await router.push(menu[index].route);
  });

  return {
    selected,
  };
}
