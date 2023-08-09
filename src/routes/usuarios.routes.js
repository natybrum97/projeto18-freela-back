import { Router } from "express";
import { postCadastro, postLogin } from "../controllers/usuarios.controller.js";
import {validateSchema} from "../middlewares/validateSchema.js"
import { schemaCadastro, schemaLogin } from "../schemas/usuarios.schemas.js";

const usuariosRouter = Router();

usuariosRouter.post("/signup", validateSchema(schemaCadastro), postCadastro );
usuariosRouter.post("/signin", validateSchema(schemaLogin), postLogin);

export default usuariosRouter;