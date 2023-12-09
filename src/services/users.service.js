import { usersRepository } from "../repository/users.repository.js";
import bcrypt from "bcrypt";
import { stripHtml } from "string-strip-html";
import { unauthorized } from "../errors/unauthorized-error.js";
import { v4 as uuid } from 'uuid';

async function signUp(signUpObject) {

    const datas = await sanitizationAndEncryption(signUpObject);

    const user = await usersRepository.seeIfUserExists(datas.sanitizedEmail);
    if (user.rows.length > 0) throw unauthorized();

    let result = await usersRepository.insertRegistrationData(datas, signUpObject);
    return result;

}

async function sanitizationAndEncryption(signUpObject) {
    const sanitizedName = stripHtml(signUpObject.name).result.trim();
    const sanitizedEmail = stripHtml(signUpObject.email).result.trim();
    const sanitizedPhone = stripHtml(signUpObject.telefone).result.trim();
    const sanitizedCep = stripHtml(signUpObject.cep).result.trim();
    const sanitizedStreet = stripHtml(signUpObject.rua).result.trim();
    const sanitizedState = stripHtml(signUpObject.state).result.trim();
    const sanitizedCity = stripHtml(signUpObject.cidade).result.trim();
    const sanitizedNeighborhood = stripHtml(signUpObject.bairro).result.trim();
    const sanitizedCpf = stripHtml(signUpObject.cpf).result.trim();
    const sanitizedPassword = stripHtml(signUpObject.password).result.trim();
    const hash = bcrypt.hashSync(sanitizedPassword, 10);
    const result = { sanitizedName, sanitizedEmail, hash, sanitizedPhone, sanitizedCep, sanitizedStreet, sanitizedState, sanitizedCity, sanitizedNeighborhood, sanitizedCpf }
    return result;
}

async function signIn(signIpObject) {
    const sanitizedEmail = stripHtml(signIpObject.email).result.trim();
    const sanitizedPassword = stripHtml(signIpObject.password).result.trim();

    const user = await usersRepository.seeIfUserExists(sanitizedEmail);
    if (user.rows.length === 0) throw unauthorized();

    const passwordThisCorrect = bcrypt.compareSync(sanitizedPassword, user.rows[0].password);
    if (!passwordThisCorrect) throw unauthorized();

    const token = uuid();

    const result = await usersRepository.registerLogin(token, user);
    return result;
}

export const usersService = {
    signUp,
    signIn
};