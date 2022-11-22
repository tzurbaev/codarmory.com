import { Unlockable } from '@/unlocks/types';
import { ComputedRef, Ref } from 'vue';
import {Attachment, AttachmentCategory} from "@/attachments/types";

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
  category_id: ComputedRef<string | null>;
  search: Ref<string | null>;
}

export interface WeaponAttachmentsList {
  category: AttachmentCategory;
  attachments: Attachment[];
}
