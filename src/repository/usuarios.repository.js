import { db } from "../database/database.connection.js";

export function VeSeUsuarioExiste(sanitizedEmail) {

    const resultado = db.query('SELECT * FROM cadastro WHERE email = $1;', [sanitizedEmail]);

    return resultado;

}

export function InsereDadosDeCadastro (sanitizedName, sanitizedEmail, hash, sanitizedTelefone, sanitizedCep, sanitizedRua, sanitizedNumeroCasa,sanitizedState,sanitizedCidade,sanitizedBairro,sanitizedCpf) {

    const result = db.query('INSERT INTO cadastro (name, email,telefone,cep,rua,"numeroCasa",state,cidade,bairro,cpf, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',[sanitizedName, sanitizedEmail, sanitizedTelefone, sanitizedCep, sanitizedRua, sanitizedNumeroCasa,sanitizedState,sanitizedCidade,sanitizedBairro,sanitizedCpf, hash]);

    return result;
    
}

export function VerificaSeEstaCadastrado (sanitizedEmail) {

    const resultado = db.query('SELECT * FROM cadastro WHERE email = $1;', [sanitizedEmail]);

    return resultado;
    
}

export function RegistraLogin(token, usuario) {

    const result = db.query('INSERT INTO login (token, "idUser") VALUES ($1, $2)', [token, usuario.rows[0].id]);

    return result;
    
}