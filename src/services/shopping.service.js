import { shoppingRepository } from '../repository/shopping.repository.js';

async function registerPurchase(insertPurchase) {
  const result = await shoppingRepository.registerPurchase(insertPurchase);
  return result;
}

export const shoppingService = {
  registerPurchase
};
