import { Router } from "express";
import { schemaProduto } from "../schemas/produtos.schemas.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { PegarProdutosPeloSeuIdDeRegistro, deletaProdutoPorId, deletaTudoDoCarrinho, pegarCarrinho, pegarProdutos, pegarProdutosPorCategoria, pegarProdutosPorId, postInserirProduto, postRegistraCarrinho } from "../controllers/produtos.controller.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const produtosRouter = Router();

produtosRouter.post("/inserirProduto", validateAuth, validateSchema(schemaProduto), postInserirProduto );
produtosRouter.get("/catalogo", validateAuth, pegarProdutos );
produtosRouter.get("/produtos/categoria/:categoria", validateAuth, pegarProdutosPorCategoria);
produtosRouter.get("/catalogoUser", validateAuth, pegarProdutosPorId );
produtosRouter.get("/catalogo/:id", validateAuth, PegarProdutosPeloSeuIdDeRegistro );
produtosRouter.post("/carrinho", validateAuth, postRegistraCarrinho);
produtosRouter.get("/carrinho", validateAuth, pegarCarrinho );
produtosRouter.delete("/carrinho/:id", validateAuth, deletaProdutoPorId);
produtosRouter.delete("/carrinho", validateAuth, deletaTudoDoCarrinho);

export default produtosRouter;