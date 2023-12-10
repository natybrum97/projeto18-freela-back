import { Router } from 'express';
import { schemaBuy } from '../schemas/shopping.schemas.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { validateAuth } from '../middlewares/validateAuth.js';
import { shoppingController } from '../controllers/shopping.controller.js';

const shoppingRouter = Router();

shoppingRouter.post('/compra', validateAuth, validateSchema(schemaBuy), shoppingController.registerPurchase);

export default shoppingRouter;
