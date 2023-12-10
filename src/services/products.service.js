import { stripHtml } from 'string-strip-html';
import { usersRepository } from '../repository/users.repository.js';
import { productsRepository } from '../repository/products.repository.js';
import { unauthorized } from '../errors/unauthorized-error.js';
import { notFoundError } from '../errors/not-found-error.js';

async function insertProduct(insertProductObject) {
  const sanitizedProductName = stripHtml(insertProductObject.nomeproduto).result.trim();
  const sanitizedDescription = stripHtml(insertProductObject.descricao).result.trim();
  const sanitizedUrl = stripHtml(insertProductObject.url).result.trim();
  const sanitizedCategory = stripHtml(insertProductObject.selectedCategory).result.trim();

  const user = await usersRepository.seeIfUserExistsById(insertProductObject.userid);
  if (user.rows.length === 0) throw unauthorized();

  const original = {
    sanitizedProductName,
    sanitizedDescription,
    valor: insertProductObject.valor,
    sanitizedUrl,
    sanitizedCategory,
    sanitizedUserId: insertProductObject.userid
  };

  const result = await productsRepository.insertProductRegistrationData(original);
  return result;
}

async function insertProductCopy(insertProductCopyObject) {
  const sanitizedProductName = stripHtml(insertProductCopyObject.nomeproduto).result.trim();
  const sanitizedDescription = stripHtml(insertProductCopyObject.descricao).result.trim();
  const sanitizedUrl = stripHtml(insertProductCopyObject.url).result.trim();
  const sanitizedCategory = stripHtml(insertProductCopyObject.selectedCategory).result.trim();

  const user = await usersRepository.seeIfUserExistsById(insertProductCopyObject.userid);
  if (user.rows.length === 0) throw unauthorized();

  const copy = {
    sanitizedProductName,
    sanitizedDescription,
    valor: insertProductCopyObject.valor,
    sanitizedUrl,
    sanitizedCategory,
    sanitizedUserId: insertProductCopyObject.userid
  };

  const result = await productsRepository.insertProductRegistrationDataCopy(copy);
  return result;
}

async function pickUpProducts() {
  const result = await productsRepository.getAllProducts();
  return result;
}

async function pickUpProductsByCategory(categoria) {
  const result = await productsRepository.pickUpProductsByCategory(categoria);
  return result;
}

async function getProductsByUserId(productsByUser) {
  const result = await productsRepository.getProductsByUserId(productsByUser);
  return result;
}

async function selectAllInformationLinkedToTheProduct(id) {
  const result = await productsRepository.selectAllInformationLinkedToTheProduct(id);
  if (result.rows.length === 0) throw notFoundError();
  return result;
}

async function getProductsByYourRegistrationIdInCopyTable(id) {
  const result = await productsRepository.getInformationToPost(id);
  if (result.rows.length === 0) throw notFoundError();
  return result;
}

async function deleteProductByIdInTableProducts(id, sessao) {
  const result = await productsRepository.getInformationToPost(id);
  if (result.rowCount === 0) throw notFoundError();
  if (result.rows[0].userid != sessao.rows[0].idUser) throw unauthorized();
  await productsRepository.deleteSearchResultInProducts(id);
}

export const productsService = {
  insertProduct,
  insertProductCopy,
  pickUpProducts,
  pickUpProductsByCategory,
  getProductsByUserId,
  selectAllInformationLinkedToTheProduct,
  getProductsByYourRegistrationIdInCopyTable,
  deleteProductByIdInTableProducts
};
