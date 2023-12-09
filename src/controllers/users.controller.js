import httpStatus from 'http-status';
import { usersService } from "../services/users.service.js";

export async function signUp(req, res, next) {
  try {
    const { name, email, telefone, cep, rua, numeroCasa, state, cidade, bairro, cpf, password } = req.body;
    const signUpObject = { name, email, telefone, cep, rua, numeroCasa, state, cidade, bairro, cpf, password };
    const result = await usersService.signUp(signUpObject);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    next(error);
  }
}

export async function signIn(req, res, next) {
  try {
    const { email, password } = req.body;
    const signInObject = { email, password };
    const result = await usersService.signIn(signInObject);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    next(error);
  }
}

export const usersController = {
  signUp,
  signIn
};

