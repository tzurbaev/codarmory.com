import { Unlockable } from '@/unlocks/types';
import { Weapon } from '@/weapons/types';

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
  category_id: string;
  slug: string;
  name: string;
  description: string | null;
  completed: boolean;
  has_errors: boolean;
  comment: string | null;
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
}

export interface AttachmentsGroup {
  category: AttachmentCategory;
  attachments: Attachment[];
}
