import Joi from "joi";

export const schemaSignUp = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    telefone: Joi.string().min(10).required(),
    cep: Joi.string().min(8).max(8).required(),
    rua: Joi.string().required(),
    numeroCasa: Joi.number().required(),
    state: Joi.string().required(),
    cidade: Joi.string().required(),
    bairro: Joi.string().required(),
    cpf: Joi.string().min(14).max(14).required(),
    password: Joi.string().min(3).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})

export const schemaSignIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})