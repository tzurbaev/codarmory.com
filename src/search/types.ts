import { RouteLocationRaw } from 'vue-router';
import { Game } from '@/games/types';

export interface SearchResult {
  id: string;
  game_id?: Game;
  name: string;
  description: string;
  route: RouteLocationRaw;
}

export interface SearchResultsGroup {
  name: string;
  results: SearchResult[];
}
