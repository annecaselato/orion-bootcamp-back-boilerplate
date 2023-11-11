import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class JwtHandler {
  //retorna token jwt
  static async signToken(payload, options = {}) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
  }

  //retorna informações do token
  static async verifyToken(token, callback) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, decoded);
      }
    });
  }
}
