import { db } from "../database/database.connection.js";

export function VeSeUsuarioExiste(sanitizedEmail) {

    const resultado = db.query('SELECT * FROM cadastro WHERE email = $1;', [sanitizedEmail]);

    return resultado;

}

export function InsereDadosDeCadastro (sanitizedName, sanitizedEmail, hash) {

    const result = db.query('INSERT INTO cadastro (name, email, password) VALUES ($1, $2, $3)',[sanitizedName, sanitizedEmail, hash]);

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