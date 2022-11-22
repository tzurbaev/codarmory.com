import { defineStore } from 'pinia';
import platforms from '@/database/platforms.json';
import { WeaponPlatform } from '@/weapons/types';

interface WeaponPlatformsState {
  platforms: WeaponPlatform[];
}

export const usePlatformsStore = defineStore({
  id: 'weapons:platforms',

  state: () => ({
    platforms,
  }) as WeaponPlatformsState,
});
