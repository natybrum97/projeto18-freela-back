import { Router } from 'express';
import { validateAuth } from '../middlewares/validateAuth.js';
import { cartController } from '../controllers/cart.controller.js';

const cartRouter = Router();

cartRouter.post('/carrinho', validateAuth, cartController.registerCart);
cartRouter.get('/carrinho', validateAuth, cartController.pickUpCart);
cartRouter.delete('/carrinho/:id', validateAuth, cartController.deleteProductByIdInCart);
cartRouter.delete('/carrinho', validateAuth, cartController.deleteEverythingFromCart);

export default cartRouter;
