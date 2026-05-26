import { register, login } from "../controllers/authController.js";
import express from 'express';
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;