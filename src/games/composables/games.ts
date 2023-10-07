import mw2 from '@/assets/images/icons/games/mw2.png';
import mw3 from '@/assets/images/icons/games/mw3.png';
import { Game } from '@/games/types';

export const gameIcons = {
  [Game.MW2]: mw2,
  [Game.MW3]: mw3,
};

export const games = {
  [Game.MW2]: 'Call of Duty: Modern Warfare II',
  [Game.MW3]: 'Call of Duty: Modern Warfare III',
};

export function useGamesOptions() {
  const options = [
    { id: null, name: 'All Games' },
    { id: Game.MW2, name: games[Game.MW2] },
    { id: Game.MW3, name: games[Game.MW3] },
  ];

  return { options };
}
