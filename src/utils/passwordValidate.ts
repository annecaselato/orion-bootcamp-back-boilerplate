export function validatePassword(password: string): boolean {
  // Pelo menos 8 caracteres, 1 letra, 1 número, 1 caractere especial
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%&*]).{8,}$/;
  return regex.test(password);
}
