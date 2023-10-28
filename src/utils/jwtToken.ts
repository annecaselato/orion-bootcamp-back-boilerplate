import { Secret, sign } from 'jsonwebtoken';

const secret: Secret = process.env.JWT_PASS;

class jwt {
  readonly secretKey: Secret;

  constructor(secretKey: Secret) {
    this.secretKey = secretKey;
  }

  async createToken(userEmail: string) {
    return sign({ userEmail }, (this.secretKey as Secret) || null, {
      expiresIn: '1d',
      algorithm: 'HS256'
    });
  }
}

export const jwtRecoverPassword = new jwt(secret);
