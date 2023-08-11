import Joi from "joi";

export const schemaProduto = Joi.object({
    nomeproduto: Joi.string().required(),
    descricao: Joi.string().required(),
    valor: Joi.number().required(),
    url: Joi.string().required(),
    selectedCategory: Joi.string().valid('Notebooks', 'Smartphones', 'Eletrodomésticos', 'Smarthomes').required(),
    userid: Joi.number().required()
})