import JwtHandler from '../services/JwtHandler';

/**
 * Middleware de Autenticação que valida o token JWT do usuário.
 *
 * @param {Object} req - Objeto de requisição express.
 * @param {Object} res - Objeto de resposta express.
 * @param {function} next - Função para chamar o próximo middleware/controller na cadeia.
 */
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

    JwtHandler.verifyToken(token, (err, decodedUser) => {
      console.log(err);

      //forbidden
      if (err) {
        return res.status(403).send({
          date: new Date(),
          status: false,
          data: 'Sem permissão. Token inválido.'
        });
      }

      req.body.user = decodedUser;

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
