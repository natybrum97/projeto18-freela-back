import { db } from "../database/database.connection.js";

export async function validateAuth(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);
    try {

        const sessao = await db.query('SELECT * FROM login WHERE token = $1;', [token]);
        if (sessao.rows.length === 0) return res.sendStatus(401);
        res.locals.sessao = sessao;
        next();

    } catch (err) {
        res.status(500).send(err.message);
    }
}