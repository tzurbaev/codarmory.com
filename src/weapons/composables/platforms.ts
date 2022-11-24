import { usePlatformsStore } from '@/weapons/stores/platforms';
import { computed, ComputedRef } from 'vue';
import { WeaponPlatform } from '@/weapons/types';

export function useWeaponPlatforms(): { platforms: ComputedRef<WeaponPlatform[]> } {
  const platformsStore = usePlatformsStore();
  const platforms = computed(() => platformsStore.platforms);

  return { platforms };
}

export function useWeaponPlatformsOptions() : { options: ComputedRef<any[]> } {
  const { platforms } = useWeaponPlatforms();
  const options = computed(() => [
    { id: null, name: 'All Platforms' },
    ...platforms.value,
  ]);

  return { options };
}
