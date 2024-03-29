export enum UnlockType {
  Auto = 'auto',
  Level = 'level',
  Weapon = 'weapon',
  DMZ = 'dmz',
  BattlePass = 'battle-pass',
  Bundle = 'bundle',
  Challenge = 'challenge',
  OneOfChallenge = 'one-of-challenge',
  BattlePassChallenges = 'battle-pass-challenges',
  Unknown = 'unknown',
  NotAvailable = 'not-available',
}

export interface Unlockable {
  unlock_type: UnlockType;
  unlock_id: string | null;
  unlock_level: number | null;
  unlock_summary: string | null;
  unlock_description: string | null;
}
