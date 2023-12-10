import { db } from '../database/database.connection.js';

export async function registerPurchase(insertPurchase) {
  const result = db.query(
    'INSERT INTO compras (carrinho, userid, valor, parcelas, tipo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [insertPurchase.carrinho, insertPurchase.userid, insertPurchase.valor, insertPurchase.parcelas, insertPurchase.tipo]
  );
  return result;
}

export const shoppingRepository = {
  registerPurchase
};
