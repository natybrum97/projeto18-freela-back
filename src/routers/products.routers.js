import { Router } from 'express';
import { schemaProduct } from '../schemas/products.schemas.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import {
  productsController,
  atualizarCheckbox,
  deletaCompras,
  getManterCheck,
  postManterCheck
} from '../controllers/products.controller.js';
import { validateAuth } from '../middlewares/validateAuth.js';

const productRouter = Router();

productRouter.post('/inserirProduto', validateAuth, validateSchema(schemaProduct), productsController.insertProduct);
productRouter.post(
  '/inserirProdutoCopia',
  validateAuth,
  validateSchema(schemaProduct),
  productsController.insertProductCopy
);
productRouter.get('/catalogo', validateAuth, productsController.pickUpProducts);
productRouter.get('/produtos/categoria/:categoria', validateAuth, productsController.pickUpProductsByCategory);
productRouter.get('/catalogoUser', validateAuth, productsController.getProductsByUserId);
productRouter.get('/catalogo/:id', validateAuth, productsController.getProductsByYourRegistrationId);
productRouter.get('/pegaPorIdNaCopia/:id', validateAuth, productsController.getProductsByYourRegistrationIdInCopyTable);
productRouter.delete('/deletaproduto/:id', validateAuth, productsController.deleteProductByIdInTableProducts);
productRouter.post('/check', validateAuth, postManterCheck);
productRouter.get('/check', validateAuth, getManterCheck);
productRouter.delete('/excluir', validateAuth, deletaCompras);
productRouter.put('/check', validateAuth, atualizarCheckbox);

export default productRouter;
