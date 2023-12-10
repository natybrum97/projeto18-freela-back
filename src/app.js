import express from 'express';
import cors from 'cors';
import router from './routers/index.routers.js';
import { handleApplicationErrors } from './middlewares/error-handling-middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleApplicationErrors);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`O servidor está rodando na porta ${port}!`));
