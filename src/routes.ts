import { Router, Request, Response } from 'express';
import { validationField, Validator } from './validator/UserValidator';
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';

const router = Router();

router.post('/signup', validationField, Validator, new UserController().create);

router.get('/', function (req, res) {
    res.send('esta é a pagina principal');
  });
  
  router.get('/login', function (req, res) {
    res.send('esta é a pagina de login');
  });
  
  router.post('/login', new AuthController().login);
  
  //Terminar e documentar endpoint posteriormente
  router.get('/v1/check', (req: Request, res: Response) => {
    res.send('Cadastro concluido!');
  });


export default router;
