import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  try {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader && authorizationHeader.split(' ')[1];

    //unauthorized
    if (!token) {
      return res.status(401).send({
        date: new Date(),
        status: false,
        data: 'Sem autorização. Token faltante.'
      });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
      console.log(err);

      //forbidden
      if (err) {
        return res.status(403).send({
          date: new Date(),
          status: false,
          data: 'Sem permissão. Token inválido.'
        });
      }

      req.body.user = JSON.stringify(user);

      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      date: new Date(),
      status: false,
      data: 'Um erro interno ocorreu.'
    });
  }
}
