import { Router } from 'express';
import { CryptocurrencyController } from '../controllers/cryptocurrencyController';
import { checkJwt } from '../middlewares/checkJwt';

const router = Router();
const controller = new CryptocurrencyController();


router.get('/cryptocurrencies', controller.getAll);

router.get('/cryptocurrencies/:id', controller.getById);

router.post('/cryptocurrencies', [checkJwt], controller.create);

router.put('/cryptocurrencies/:id', [checkJwt], controller.update);

router.delete('/cryptocurrencies/:id', [checkJwt], controller.delete);

export default router;
