import jwt from 'jsonwebtoken';

class JwtHandler {
  sign(payload, options = {}) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
  }

  verify(token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
      (err, decodedUser) => {
        console.log(err);

        //forbidden
        if (err) {
          return {
            date: new Date(),
            status: false,
            data: 'Sem permissão. Token inválido.'
          };
        }

        return decodedUser;
      }
    );
  }
}

module.exports = JwtHandler;
