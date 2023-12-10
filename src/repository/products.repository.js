import { db } from '../database/database.connection.js';

export async function insertProductRegistrationData(original) {
  const result = await db.query(
    'INSERT INTO produtos (nomeproduto, descricao, valor, url,"selectedCategory", userid) VALUES ($1, $2, $3::numeric, $4, $5, $6) RETURNING *',
    [
      original.sanitizedProductName,
      original.sanitizedDescription,
      original.valor,
      original.sanitizedUrl,
      original.sanitizedCategory,
      original.sanitizedUserId
    ]
  );
  return result.rows[0];
}

export async function insertProductRegistrationDataCopy(copy) {
  const result = await db.query(
    'INSERT INTO duplicata (nomeproduto, descricao, valor, url,"selectedCategory", userid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [
      copy.sanitizedProductName,
      copy.sanitizedDescription,
      copy.valor,
      copy.sanitizedUrl,
      copy.sanitizedCategory,
      copy.sanitizedUserId
    ]
  );
  return result.rows[0];
}

export async function getAllProducts() {
  const result = await db.query('SELECT * FROM produtos;');
  return result;
}

export async function pickUpProductsByCategory(categoria) {
  const result = await db.query('SELECT * FROM produtos WHERE "selectedCategory" = $1;', [categoria]);
  return result;
}

export async function getProductsByUserId(productsByUser) {
  const result = await db.query('SELECT * FROM duplicata WHERE userid = $1;', [productsByUser]);
  return result;
}

export async function getInformationToPost(id) {
  const result = await db.query('SELECT * FROM produtos WHERE id = $1;', [id]);
  return result;
}

export async function selectAllInformationLinkedToTheProduct(id) {
  const result = await db.query(
    `
        SELECT
            cadastro.id AS id_do_user,
            produtos.userid AS verificacao_id_do_user,
            cadastro.name AS nome_do_vendedor,
            cadastro.email AS email_do_vendedor,
            cadastro.telefone AS telefone_do_vendedor,
            cadastro.cidade AS cidade_do_vendedor,
            cadastro.state AS estado_do_vendedor,
            produtos.id AS id_do_produto,
            produtos.nomeproduto AS nome_do_produto,
            produtos.descricao AS descricao_do_produto,
            produtos.valor AS valor_do_produto,
            produtos.url AS foto_do_produto,
            produtos."selectedCategory" AS categoria_do_produto
        FROM cadastro
        JOIN produtos ON cadastro.id = produtos.userid
        WHERE produtos.id = $1;`,
    [id]
  );
  return result;
}

export async function deleteSearchResultInProducts(id) {
  await db.query('DELETE FROM produtos WHERE id = $1;', [id]);
}

export const productsRepository = {
  insertProductRegistrationData,
  insertProductRegistrationDataCopy,
  getAllProducts,
  pickUpProductsByCategory,
  getProductsByUserId,
  selectAllInformationLinkedToTheProduct,
  getInformationToPost,
  deleteSearchResultInProducts
};
