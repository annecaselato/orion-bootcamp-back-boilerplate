export const timestamp: number = Date.now();

export const baseURL = (): string => {
  return 'https://gateway.marvel.com/v1/public';
};

export const maxMarvelAPILimit = (): number => {
  return 100;
};

export const cardsPerPage = (): number => {
  return 9;
};

export const maximunValidPage = (): number => {
  return 174;
};
