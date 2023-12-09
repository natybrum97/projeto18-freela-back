import { db } from '../database/database.connection.js'

export async function registerLogin(token, user) {
  const result = await db.query('INSERT INTO login (token, "idUser") VALUES ($1, $2) RETURNING *', [
    token,
    user.rows[0].id,
  ])
  return result.rows[0]
}

export async function seeIfUserExists(sanitizedEmail) {
  const result = await db.query('SELECT * FROM cadastro WHERE email = $1;', [sanitizedEmail])
  return result
}

export async function insertRegistrationData(datas, signUpObject) {
  const result = await db.query(
    'INSERT INTO cadastro (name, email,telefone,cep,rua,"numeroCasa",state,cidade,bairro,cpf, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
    [
      datas.sanitizedName,
      datas.sanitizedEmail,
      datas.sanitizedPhone,
      datas.sanitizedCep,
      datas.sanitizedStreet,
      signUpObject.numeroCasa,
      datas.sanitizedState,
      datas.sanitizedCity,
      datas.sanitizedNeighborhood,
      datas.sanitizedCpf,
      datas.hash,
    ],
  )
  return result.rows[0]
}

export const usersRepository = {
  insertRegistrationData,
  seeIfUserExists,
  registerLogin,
}
