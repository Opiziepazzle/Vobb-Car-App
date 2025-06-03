import { Router } from 'express';
import { createCar, getCars } from '../controllers/carController';
import { checkAuth } from '../middlewares/checkAuth';

const router = Router();

router.post('/', checkAuth, createCar);


router.get('/', getCars);

export default router;




