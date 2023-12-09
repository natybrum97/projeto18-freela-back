import { Router } from 'express'
import { schemaCompra, schemaProduto } from '../schemas/produtos.schemas.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import {
  PegarProdutosPeloSeuIdDeRegistro,
  PegarProdutosPeloSeuIdDeRegistroNaTabelaDeCopia,
  atualizarCheckbox,
  deletaCompras,
  deletaProdutoPorId,
  deletaProdutoPorIdNaTabelaProdutos,
  deletaTudoDoCarrinho,
  getManterCheck,
  pegarCarrinho,
  pegarProdutos,
  pegarProdutosPorCategoria,
  pegarProdutosPorId,
  postInserirProduto,
  postInserirProdutoCopia,
  postManterCheck,
  postRegistraCarrinho,
  registraCompra,
} from '../controllers/produtos.controller.js'
import { validateAuth } from '../middlewares/validateAuth.js'

const produtosRouter = Router()

produtosRouter.post('/inserirProduto', validateAuth, validateSchema(schemaProduto), postInserirProduto)
produtosRouter.post('/inserirProdutoCopia', validateAuth, validateSchema(schemaProduto), postInserirProdutoCopia)
produtosRouter.get('/catalogo', validateAuth, pegarProdutos)
produtosRouter.get('/produtos/categoria/:categoria', validateAuth, pegarProdutosPorCategoria)
produtosRouter.get('/catalogoUser', validateAuth, pegarProdutosPorId)
produtosRouter.get('/catalogo/:id', validateAuth, PegarProdutosPeloSeuIdDeRegistro)
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
produtosRouter.post('/compra', validateAuth, validateSchema(schemaCompra), registraCompra)

export default produtosRouter
