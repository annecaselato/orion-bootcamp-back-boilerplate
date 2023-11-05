import { Router, Request, Response } from 'express';
import { validationField, Validator } from './validator/UserValidator';
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import { authenticateToken } from './middleware/AuthMiddleware';
import { Metrics } from './entity/Metrics';
import { MysqlDataSource } from './config/database';
import { Character } from './entity/Character';
import { User } from './entity/User';

const router = Router();

//garantir apenas acesso autenticado à dashboard
router.all('/v1/dashboard', authenticateToken, (req, res) => {
  res.sendStatus(200);
});

router.get('/v1/select/:character_id', authenticateToken, async (req, res) => {
  const character_id: number = Number(req.params.character_id);
  const user_id: number = req.body.user.id;

  const userRepository = MysqlDataSource.getRepository(User);
  const characterRepository = MysqlDataSource.getRepository(Character);
  const metricsRepository = MysqlDataSource.getRepository(Metrics);

  //procura para ver se a métrica já existe
  const metric = await metricsRepository.findOne({
    where: { user: { id: user_id }, character: { id: character_id } }
  });

  if (metric) {
    metric.clicks += 1;

    await metricsRepository.save(metric);
  } else {
    //find no usuario
    const user: User = await userRepository.findOne({
      where: {
        id: user_id
      }
    });

    //find no personagem
    const character: Character = await characterRepository.findOne({
      where: {
        id: character_id
      }
    });

    const metricsEntry = new Metrics();
    metricsEntry.user = user;
    metricsEntry.character = character;
    metricsEntry.clicks = 1;

    await MysqlDataSource.manager.save(metricsEntry);
  }

  res
    .status(200)
    .send(
      'O usuário ' +
        req.body.user.id +
        ' selecionou o personagem ' +
        character_id
    );
});

router.post('/v1/login', new AuthController().login);

router.post(
  '/v1/signUp',
  validationField,
  Validator,
  new UserController().create
);

router.get('/v1/check', new AuthController().confirmRegistration);
export default router;
