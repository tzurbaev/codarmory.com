import { Unlockable } from '@/unlocks/types';
import { Weapon } from '@/weapons/types';
import { Game } from '@/games/types';

export interface AttachmentCategory {
  id: string;
  name: string;
  sorting: number;
}

export interface AttachmentStat {
  id: string;
  name: string;
}

export interface Attachment extends Unlockable {
  id: string;
  game_id: Game,
  category_id: string;
  slug: string;
  name: string;
  description: string | null;
  pros: string[];
  cons: string[];
  category?: AttachmentCategory | null;
  stats?: {
    pros: AttachmentStat[];
    cons: AttachmentStat[];
  };
  weapon?: Weapon | null;
}

export interface AttachmentsFilters {
  search: string;
  pros: string[];
  prosMode: string;
  matchAllPros: boolean;
  cons: string[];
  consMode: string;
  matchAllCons: boolean;
  game_id?: Game | null;
}

export interface AttachmentsGroup {
  category: AttachmentCategory;
  attachments: Attachment[];
}
