import * as bcrypt from 'bcrypt';

/**
 * Encrypts passwords and compares the real password with hashed one
 */
export class BcryptUtils {
  /**
   * hashPassword
   *
   * Generates encrypted password using 'bcrypt.hash()' function.
   *
   * @param password by user.
   * @returns {Promise<string>} String representing the encrypted version of the password, returned from
   * asynchronous call to bcrypt api.
   */
  public static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * comparePassword
   *
   * Compares the actual password with its encrypted version stored in the database.
   *
   * @param plainTextPassword representing actual password by user.
   * @param hashedPassword representing ecrypted password.
   * @returns {Promise<boolean>} True or false regarding correspondence between the 2 passwords.
   */
  public static async comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
