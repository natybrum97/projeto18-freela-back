import httpStatus from 'http-status';
import { cartService } from '../services/cart.service.js';

export async function registerCart(req, res, next) {
  try {
    const { sessao } = res.locals;
    const { categoria, description, nome, url, valor, idProduto } = req.body;
    const insertCartObject = { categoria, description, nome, url, valor, idProduto };
    const result = await cartService.registerCart(insertCartObject, sessao);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    next(error);
  }
}

export async function pickUpCart(req, res) {
  const { sessao } = res.locals;
  try {
    const listProducts = await cartService.pickUpCart(sessao);
    if (listProducts.rows === undefined) {
      res.send([]);
    } else {
      res.send(listProducts.rows);
    }
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

export async function deleteProductByIdInCart(req, res, next) {
  const { id } = req.params;
  const { sessao } = res.locals;
  try {
    await cartService.deleteProductByIdInCart(id, sessao);
    res.status(httpStatus.NO_CONTENT).send('Produto Deletado com sucesso!');
  } catch (err) {
    next(err);
  }
}

export async function deleteEverythingFromCart(req, res, next) {
  try {
    await cartService.deleteEverythingFromCart();
    res.status(httpStatus.NO_CONTENT).send('Todos os produtos foram removidos do carrinho!');
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

export const cartController = {
  registerCart,
  pickUpCart,
  deleteProductByIdInCart,
  deleteEverythingFromCart
};
