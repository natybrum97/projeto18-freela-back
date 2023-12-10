import Joi from 'joi';

export const schemaBuy = Joi.object({
  carrinho: Joi.string().required(),
  userid: Joi.number().required(),
  valor: Joi.number().required(),
  parcelas: Joi.number().min(1).max(12).required(),
  tipo: Joi.string().valid('Boleto', 'Cartão de Crédito').required()
});
