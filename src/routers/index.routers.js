import { Router } from "express";
import usersRouter from "./users.routers.js";
import produtosRouter from "./produtos.routers.js";

const router = Router();

router.use(usersRouter);
router.use(produtosRouter);

export default router;