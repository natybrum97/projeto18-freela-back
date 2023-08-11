import { Router } from "express";
import usuariosRouter from "./usuarios.routes.js";
import produtosRouter from "./produtos.routes.js";

const router = Router();

router.use(usuariosRouter);
router.use(produtosRouter);

export default router;