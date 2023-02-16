import { RouteLocationRaw } from 'vue-router';

export interface SearchResult {
  id: string;
  name: string;
  description: string;
  route: RouteLocationRaw;
}

export interface SearchResultsGroup {
  name: string;
  results: SearchResult[];
}
