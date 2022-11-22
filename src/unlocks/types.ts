export enum UnlockType {
  Auto = 'auto',
  Level = 'level',
  Weapon = 'weapon',
  DMZ = 'dmz',
  BattlePass = 'battle-pass',
  Unknown = 'unknown',
}

export interface Unlockable {
  unlock_type: UnlockType;
  unlock_id: string | null;
  unlock_level: number | null;
  unlock_description: string | null;
}
