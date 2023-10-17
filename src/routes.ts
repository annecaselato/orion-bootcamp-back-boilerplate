import { Router } from 'express';
import { HomeController } from './controller/HomeController';

const router = Router();

//router.get('/', new HomeController().hello);

router.get('/', function(req, res){
    res.send('hi');
});


export default router;
