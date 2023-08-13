import Joi from "joi";

export const schemaProduto = Joi.object({
    nomeproduto: Joi.string().required(),
    descricao: Joi.string().required(),
    valor: Joi.number().required(),
    url: Joi.string().required(),
    selectedCategory: Joi.string().valid('Notebooks', 'Smartphones', 'Eletrodomésticos', 'Smarthomes').required(),
    userid: Joi.number().required()
})

export const schemaCompra = Joi.object({
    carrinho: Joi.required(),
    userid: Joi.string().required(),
    valor: Joi.number().required(),
    parcelas: Joi.number().min(1).max(12).required(),
    tipo: Joi.string().valid("Boleto","Cartão de Crédito").required()
})