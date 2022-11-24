import { Criterion } from '@/database/criteria';
import { Weapon } from '@/weapons/types';

export function getWeaponCategoryCriterion(category?: string | null): Criterion<Weapon> {
  return (weapon: Weapon): boolean => !category || weapon.category_id === category;
}

export function getWeaponPlatformCriterion(platform?: string | null): Criterion<Weapon> {
  return (weapon: Weapon): boolean => !platform || weapon.platform_id === platform;
}

export function getWeaponAttachmentCriterion(attachment?: string | null): Criterion<Weapon> {
  return (weapon: Weapon): boolean => !attachment || weapon.attachments.indexOf(attachment) !== -1;
}

export function getWeaponSearchCriterion(search?: string | null): Criterion<Weapon> {
  const query = typeof search === 'string' ? search.toLowerCase() : null;

  return (weapon: Weapon): boolean => {
    if (!query) {
      return true;
    }

    return weapon.name.toLowerCase().includes(query) || weapon.id.toLowerCase().includes(query);
  };
}
