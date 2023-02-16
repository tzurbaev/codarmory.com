import { defineStore } from 'pinia';

interface SearchState {
  active: boolean;
}

export const useSearchStore = defineStore({
  id: 'search',

  state: () => ({
    active: false,
  }) as SearchState,

  actions: {
    open() {
      this.active = true;
    },

    close() {
      this.active = false;
    },
  },
});
