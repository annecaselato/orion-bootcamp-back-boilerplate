import jwt from 'jsonwebtoken';

export default class JwtHandler {
  static async signToken(payload, options = {}) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
  }

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
