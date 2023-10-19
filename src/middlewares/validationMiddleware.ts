export function validateEmailAndPassword(email, password): boolean {
  return !validateEmail(email) || !validatePassword(password);
}

function validateEmail(email): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

function validatePassword(password): boolean {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);
}
