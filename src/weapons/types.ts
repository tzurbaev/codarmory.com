import { Unlockable } from '@/unlocks/types';

export interface WeaponCategory {
  id: string;
  name: string;
  alias: string | null;
}

export interface WeaponPlatform {
  id: string;
  name: string;
}

export interface Weapon extends Unlockable {
  id: string;
  category_id: string;
  platform_id: string | null;
  name: string;
  attachments: string[];
  category?: WeaponCategory | null;
  platform?: WeaponPlatform | null;
  parent?: Weapon | null;
}

export interface WeaponsFilters {
  category_id?: string | null;
  attachment_id?: string | null;
  platform_id?: string | null;
  search?: string | null;
}
