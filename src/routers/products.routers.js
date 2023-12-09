import { Router } from 'express'
import { schemaBuy, schemaProduct } from '../schemas/products.schemas.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { productsController } from '../controllers/products.controller.js'
import {
  PegarProdutosPeloSeuIdDeRegistroNaTabelaDeCopia,
  atualizarCheckbox,
  deletaCompras,
  deletaProdutoPorId,
  deletaProdutoPorIdNaTabelaProdutos,
  deletaTudoDoCarrinho,
  getManterCheck,
  pegarCarrinho,
  postManterCheck,
  postRegistraCarrinho,
  registraCompra,
} from '../controllers/products.controller.js'
import { validateAuth } from '../middlewares/validateAuth.js'

const produtosRouter = Router()

produtosRouter.post('/inserirProduto', validateAuth, validateSchema(schemaProduct), productsController.insertProduct)
produtosRouter.post('/inserirProdutoCopia', validateAuth, validateSchema(schemaProduct), productsController.insertProductCopy)
produtosRouter.get('/catalogo', validateAuth, productsController.pickUpProducts)
produtosRouter.get('/produtos/categoria/:categoria', validateAuth, productsController.pickUpProductsByCategory)
produtosRouter.get('/catalogoUser', validateAuth, productsController.getProductsByUserId)
produtosRouter.get('/catalogo/:id', validateAuth, productsController.getProductsByYourRegistrationId)
produtosRouter.get('/pegaPorIdNaCopia/:id', validateAuth, PegarProdutosPeloSeuIdDeRegistroNaTabelaDeCopia)
produtosRouter.post('/carrinho', validateAuth, postRegistraCarrinho)
produtosRouter.get('/carrinho', validateAuth, pegarCarrinho)
produtosRouter.delete('/carrinho/:id', validateAuth, deletaProdutoPorId)
produtosRouter.delete('/deletaproduto/:id', validateAuth, deletaProdutoPorIdNaTabelaProdutos)
produtosRouter.delete('/carrinho', validateAuth, deletaTudoDoCarrinho)
produtosRouter.post('/check', validateAuth, postManterCheck)
produtosRouter.get('/check', validateAuth, getManterCheck)
produtosRouter.delete('/excluir', validateAuth, deletaCompras)
produtosRouter.put('/check', validateAuth, atualizarCheckbox)
produtosRouter.post('/compra', validateAuth, validateSchema(schemaBuy), registraCompra)

export default produtosRouter
