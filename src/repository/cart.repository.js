import { db } from '../database/database.connection.js';

export async function registerCart(product) {
  const result = await db.query(
    'INSERT INTO carrinho (categoria, description, nome, url, valor, "idProduto", "idUsuario") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [
      product.sanitizedCategory,
      product.sanitizedDescription,
      product.sanitizedProductName,
      product.sanitizedUrl,
      product.sanitizedValue,
      product.sanitizedIdProduct,
      product.session
    ]
  );
  return result.rows[0];
}

export async function pickUpCart(sessao) {
  const result = await db.query('SELECT * FROM carrinho WHERE "idUsuario" = $1;', [sessao.rows[0].idUser]);
  return result;
}

export async function searchWhatWillDelete(id) {
  const result = await db.query('SELECT * FROM carrinho WHERE id = $1;', [id]);
  return result;
}

export async function deleteSearchResult(id) {
  await db.query('DELETE FROM carrinho WHERE id = $1;', [id]);
}

export async function deleteEverythingFromCart() {
  await db.query('DELETE FROM carrinho;');
}

export const cartRepository = {
  registerCart,
  pickUpCart,
  searchWhatWillDelete,
  deleteSearchResult,
  deleteEverythingFromCart
};
