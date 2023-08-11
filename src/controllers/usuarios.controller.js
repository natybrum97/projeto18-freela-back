import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import { InsereDadosDeCadastro, RegistraLogin, VeSeUsuarioExiste, VerificaSeEstaCadastrado } from "../repository/usuarios.repository.js";

export async function postCadastro (req, res) {

    const { name, email, telefone,cep,rua,numeroCasa,state,cidade,bairro,cpf, password } = req.body;

    const sanitizedName = stripHtml(name).result.trim();
    const sanitizedEmail = stripHtml(email).result.trim();
    const sanitizedTelefone = stripHtml(telefone).result.trim();
    const sanitizedCep = stripHtml(cep).result.trim();
    const sanitizedRua = stripHtml(rua).result.trim();
    const sanitizedNumeroCasa = stripHtml(numeroCasa).result.trim();
    const sanitizedState = stripHtml(state).result.trim();
    const sanitizedCidade = stripHtml(cidade).result.trim();
    const sanitizedBairro = stripHtml(bairro).result.trim();
    const sanitizedCpf = stripHtml(cpf).result.trim();
    const sanitizedPassword = stripHtml(password).result.trim();

    try {

      const usuario = await VeSeUsuarioExiste (sanitizedEmail)
      
        if (usuario.rows.length > 0) return res.status(409).send("Esse usuário já existe!");

        const hash = bcrypt.hashSync(sanitizedPassword, 10);

        await InsereDadosDeCadastro (sanitizedName, sanitizedEmail, hash, sanitizedTelefone, sanitizedCep, sanitizedRua, sanitizedNumeroCasa,sanitizedState,sanitizedCidade,sanitizedBairro,sanitizedCpf);

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function postLogin (req, res) {

    const { email, password } = req.body;

    const sanitizedEmail = stripHtml(email).result.trim();
    const sanitizedPassword = stripHtml(password).result.trim();


    try {

      const usuario = await VerificaSeEstaCadastrado (sanitizedEmail);
      
        if (usuario.rows.length === 0) return res.status(401).send("Usuário não cadastrado!");

       const senhaEstaCorreta = bcrypt.compareSync(sanitizedPassword, usuario.rows[0].password);
        if (!senhaEstaCorreta) return res.status(401).send("Senha incorreta!");

      const token = uuid();

      await RegistraLogin (token, usuario);

      return res.status(200).send({token: token, nome: usuario.rows[0].name, id: usuario.rows[0].id});

    } catch (err) {
      res.status(500).send(err.message);
    }
}