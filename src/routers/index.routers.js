import { Router } from 'express';
import usersRouter from './users.routers.js';
import productRouter from './products.routers.js';
import cartRouter from './cart.routers.js';
import shoppingRouter from './shopping.routers.js';

const router = Router();

router.use(usersRouter);
router.use(productRouter);
router.use(cartRouter);
router.use(shoppingRouter);

export default router;
