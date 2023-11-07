import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

export class JwtUtils {
  /**
   *Generates jwt token, using 'jwt.sign' function. Static to allow to be called inside class itself.
   * @param data instance of user to which the token will be assigned.
   * @param expiresIn Time taken until token expires.
   * @returns {Promise<string>} JWT token (string), returned from asynchronously from jwt api.
   */
  public static generateJWTToken(data: object, expiresIn: string): Promise<string> {
    return jwt.sign(data, secretKey, { expiresIn });
  }

  /**
   * Verifies a JWT token for authentication.
   * @param token - The JWT token to be verified.
   * @returns An object representing the verified data or a JWT verification error.
   */
  public static verifyJWTToken(token: string): object | jwt.VerifyErrors {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      return { error };
    }
  }
}
