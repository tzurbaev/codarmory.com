import { RouteLocationRaw } from 'vue-router';

export interface MenuItem {
  id: string;
  name: string;
  active: boolean;
  route: RouteLocationRaw;
}
