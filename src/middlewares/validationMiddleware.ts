/**
 * validateEmailAndPassword
 *
 * Calls functions to validate email and password
 *
 * @param email inserted by user when trying to authenticate.
 * @param password inserted by user when trying to authenticate.
 * @returns {boolean} If password or email format is invalid it returns false
 */
export function validateEmailAndPassword(email: string, password: string): boolean {
  return !validateEmail(email) || !validatePassword(password);
}

/**
 * validateEmail
 *
 * Validates email format
 *
 * @param email inserted by user when trying to authenticate.
 * @returns {boolean} If password format is valid or not
 */
function validateEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

/**
 * Validates password format
 * @param password inserted by user when trying to authenticate.
 * @returns {boolean} If password format is valid or not
 * (Minimum 8 chars, 1 uppercase, 1 lowercase, 1 number and 1 special character)
 */
function validatePassword(password: string): boolean {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);
}
