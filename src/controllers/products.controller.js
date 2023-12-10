import httpStatus from 'http-status';
import { productsService } from '../services/products.service.js';
import { db } from '../database/database.connection.js';

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

export async function postManterCheck(req, res) {
  const { productId, isChecked } = req.body;

  try {
    const query =
      'INSERT INTO checkbox_states (product_id, is_checked) VALUES ($1, $2) ON CONFLICT (product_id) DO UPDATE SET is_checked = $2';
    await db.query(query, [productId, isChecked]);
    console.log(`Estado do checkbox para o produto com ID ${productId} foi salvo`);
    res.json({ success: true });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

export async function getManterCheck(req, res) {
  try {
    const query = 'SELECT product_id, is_checked FROM checkbox_states';
    const result = await db.query(query);
    const checkboxStates = {};
    result.rows.forEach((row) => {
      checkboxStates[row.product_id] = row.is_checked;
    });
    res.json(checkboxStates);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

export async function deletaCompras(req, res) {
  const { ids } = req.body;

  try {
    const idPlaceholders = ids.map((_, index) => `$${index + 1}`).join(',');

    const query = `DELETE FROM produtos WHERE id IN (${idPlaceholders});`;

    const resultadoProdutos = await db.query(query, ids);

    const resultadoCarrinho = await db.query('DELETE FROM carrinho;');

    res.status(httpStatus.OK).send(`Produtos com IDs ${ids.join(', ')} foram removidos e o carrinho foi esvaziado.`);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

export async function atualizarCheckbox(req, res) {
  const { ids } = req.body;
  const isChecked = true;

  try {
    const query =
      'INSERT INTO checkbox_states (product_id, is_checked) VALUES ($1, $2) ON CONFLICT (product_id) DO UPDATE SET is_checked = $2';

    for (const productId of ids) {
      await db.query(query, [productId, isChecked]);
      console.log(`Estado do checkbox para o produto com ID ${productId} foi atualizado para ${isChecked}`);
    }

    res.json({ success: true });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
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
