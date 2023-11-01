import { Router, Request, Response } from 'express';
import { AuthController } from './controller/AuthController';
import { authenticateToken } from './middleware/AuthMiddleware';

const router = Router();

//garantir apenas acesso autenticado à dashboard
router.all('/dashboard', authenticateToken, (req, res) =>{
    res.status(200);
});

router.post('/login', new AuthController().login);

router.get('/v1/check', new AuthController().confirmRegistration);

export default router;
