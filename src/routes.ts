import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { CadastroController } from './controller/CadastroController';

const router = Router();

router.get('/', new HomeController().hello);

router.get('/user/cadastro', new CadastroController().msg);

export default router;
