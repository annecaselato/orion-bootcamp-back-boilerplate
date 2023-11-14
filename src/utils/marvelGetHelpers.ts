import moment from 'moment';
import md5 from 'md5';
import 'dotenv/config';

// Funções de definição de constantes para get characters API Marvel

export function* offsetter() {
  let value = 0;
  while (true) {
    yield value;
    value += maxMarvelAPILimit();
  }
}

export const getTimestamp = (): number => {
  return Date.now();
};

export const baseURL = (): string => {
  return process.env.MARVEL_URL_BASE;
};

export const maxMarvelAPILimit = (): number => {
  return 100;
};

export function sevenDaysAgo(): string {
  const today = moment();
  const sevenDaysAgoString: string = today
    .subtract(7, 'days')
    .format('YYYY-MM-DD');
  return sevenDaysAgoString;
}

// Função auxiliar para geração de hash para API Marvel

export const hashGenarator = async (timestamp: number): Promise<string> => {
  return md5(
    timestamp + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_API_KEY
  );
};
