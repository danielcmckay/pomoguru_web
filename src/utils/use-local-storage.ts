export const useLocalStorage = (): [
  setItem: (key: string, value: string) => void,
  getItem: (key: string) => string | null
] => {
  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const getItem = (key: string) => {
    return localStorage.getItem(key);
  };

  return [setItem, getItem];
};
