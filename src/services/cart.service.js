import { stripHtml } from 'string-strip-html';
import { cartRepository } from '../repository/cart.repository.js';
import { notFoundError } from '../errors/not-found-error.js';
import { unauthorized } from '../errors/unauthorized-error.js';

async function registerCart(insertCartObject, sessao) {
  const sanitizedCategory = stripHtml(insertCartObject.categoria).result.trim();
  const sanitizedDescription = stripHtml(insertCartObject.description).result.trim();
  const sanitizedProductName = stripHtml(insertCartObject.nome).result.trim();
  const sanitizedUrl = stripHtml(insertCartObject.url).result.trim();
  const sanitizedValue = insertCartObject.valor;
  const sanitizedIdProduct = insertCartObject.idProduto;
  const session = sessao.rows[0].idUser;

  const product = {
    sanitizedCategory,
    sanitizedDescription,
    sanitizedProductName,
    sanitizedUrl,
    sanitizedValue,
    sanitizedIdProduct,
    session
  };

  const result = await cartRepository.registerCart(product);
  return result;
}

async function pickUpCart(sessao) {
  const result = await cartRepository.pickUpCart(sessao);
  return result;
}

async function deleteProductByIdInCart(id, sessao) {
  const result = await cartRepository.searchWhatWillDelete(id);
  if (result.rowCount === 0) throw notFoundError();
  if (result.rows[0].idUsuario != sessao.rows[0].idUser) throw unauthorized();
  await cartRepository.deleteSearchResult(id);
}

async function deleteEverythingFromCart() {
  await cartRepository.deleteEverythingFromCart();
}

export const cartService = {
  registerCart,
  pickUpCart,
  deleteProductByIdInCart,
  deleteEverythingFromCart
};
