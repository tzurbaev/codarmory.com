import { Unlockable } from '@/unlocks/types';
import { Game } from '@/games/types';

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
  game_id: Game,
  category_id: string;
  platform_id: string | null;
  name: string;
  max_level: number;
  attachments: string[];
  category?: WeaponCategory | null;
  platform?: WeaponPlatform | null;
  parent?: Weapon | null;
}

export interface StaticWeaponsFilters {
  category_id?: string | null;
  attachment_id?: string | null;
}

export interface WeaponsFilters {
  category_id?: string | null;
  attachment_id?: string | null;
  platform_id?: string | null;
  search?: string | null;
  game_id?: Game | null;
}
