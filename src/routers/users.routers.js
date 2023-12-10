import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.js';
import { schemaSignUp, schemaSignIn } from '../schemas/users.schemas.js';
import { usersController } from '../controllers/users.controller.js';

const usersRouter = Router();

usersRouter.post('/signup', validateSchema(schemaSignUp), usersController.signUp);
usersRouter.post('/signin', validateSchema(schemaSignIn), usersController.signIn);

export default usersRouter;
