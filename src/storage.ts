export const storage = {
  get: (key: string): any => {
    const item = localStorage.getItem(`codarmory:${key}`);

    if (!item) {
      return null;
    }

    return JSON.parse(item).value;
  },

  set: (key: string, value: any): void => {
    localStorage.setItem(`codarmory:${key}`, JSON.stringify({ value }));
  },
};
