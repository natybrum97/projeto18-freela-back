import httpStatus from 'http-status';
import { shoppingService } from '../services/shopping.service.js';

export async function registerPurchase(req, res, next) {
  try {
    const { carrinho, userid, valor, parcelas, tipo } = req.body;
    const insertPurchase = { carrinho, userid, valor, parcelas, tipo };
    const result = await shoppingService.registerPurchase(insertPurchase);
    return res.status(httpStatus.CREATED).send(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

export const shoppingController = {
  registerPurchase
};
