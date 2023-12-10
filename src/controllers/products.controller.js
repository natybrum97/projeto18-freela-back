import httpStatus from 'http-status';
import { productsService } from '../services/products.service.js';

export async function insertProduct(req, res, next) {
  try {
    const { nomeproduto, descricao, valor, url, selectedCategory, userid } = req.body;
    const insertProductObject = { nomeproduto, descricao, valor, url, selectedCategory, userid };
    const result = await productsService.insertProduct(insertProductObject);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    next(error);
  }
}

export async function insertProductCopy(req, res, next) {
  try {
    const { nomeproduto, descricao, valor, url, selectedCategory, userid } = req.body;
    const insertProductCopyObject = { nomeproduto, descricao, valor, url, selectedCategory, userid };
    const result = await productsService.insertProductCopy(insertProductCopyObject);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    next(error);
  }
}

export async function pickUpProducts(req, res) {
  try {
    const listProducts = await productsService.pickUpProducts();
    res.send(listProducts.rows);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

export async function pickUpProductsByCategory(req, res) {
  const { categoria } = req.params;
  try {
    const listProductsByCategory = await productsService.pickUpProductsByCategory(categoria);
    res.send(listProductsByCategory.rows);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

export async function getProductsByUserId(req, res) {
  const { sessao } = res.locals;
  try {
    const productsByUser = sessao.rows[0].idUser;
    const listProducts = await productsService.getProductsByUserId(productsByUser);
    res.send(listProducts.rows);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

export async function getProductsByYourRegistrationId(req, res, next) {
  const { id } = req.params;
  try {
    const getProduct = await productsService.selectAllInformationLinkedToTheProduct(id);
    return res.status(httpStatus.OK).send(getProduct.rows);
  } catch (err) {
    next(err);
  }
}

export async function getProductsByYourRegistrationIdInCopyTable(req, res, next) {
  const { id } = req.params;
  try {
    const getProduct = await productsService.getProductsByYourRegistrationIdInCopyTable(id);
    return res.status(httpStatus.OK).send(getProduct.rows);
  } catch (err) {
    next(err);
  }
}

export async function deleteProductByIdInTableProducts(req, res, next) {
  const { id } = req.params;
  const { sessao } = res.locals;
  try {
    await productsService.deleteProductByIdInTableProducts(id, sessao);
    res.status(httpStatus.NO_CONTENT).send('Produto Deletado com sucesso!');
  } catch (err) {
    next(err);
  }
}

export const productsController = {
  insertProduct,
  insertProductCopy,
  pickUpProducts,
  pickUpProductsByCategory,
  getProductsByUserId,
  getProductsByYourRegistrationId,
  getProductsByYourRegistrationIdInCopyTable,
  deleteProductByIdInTableProducts
};
