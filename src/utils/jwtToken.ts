import { Secret, sign } from 'jsonwebtoken';

const secret: Secret = process.env.JWT_PASS;

class jwt {
  readonly secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  async createToken(userEmail) {
    return sign({ data: { userEmail } }, (this.secretKey as Secret) || null, {
      expiresIn: '1d',
      algorithm: 'HS256'
    });
  }
}

export const jwtRecoverPassword = new jwt(secret);
