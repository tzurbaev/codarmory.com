import { usePlatformsStore } from '@/weapons/stores/platforms';
import { computed, ComputedRef } from 'vue';
import { WeaponPlatform } from '@/weapons/types';

const platformsStore = usePlatformsStore();

export function useWeaponPlatforms(): { platforms: ComputedRef<WeaponPlatform[]> } {
  const platforms = computed(() => platformsStore.platforms);

  return { platforms };
}
