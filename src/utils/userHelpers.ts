export enum Gender {
  'female' = 'Mulher (cis ou trans)',
  'male' = 'Homem (cis ou trans)',
  'non-binary' = 'Não Binário',
  'unknown' = 'Prefiro não dizer'
}

export function genderTypes(): typeof Gender {
  return Gender;
}

export const minimunAgeAllowed = (): number => {
  return 10;
};
