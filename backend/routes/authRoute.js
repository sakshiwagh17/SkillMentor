import express from 'express';
import { login, logOut, register } from '../controllers/authcontroller.js';
import { loginValidation, signUpValidation } from '../middleware/authValidation.js';

const authRouter=express.Router();

authRouter.post('/register',signUpValidation,register);
authRouter.post('/login',loginValidation,login);
authRouter.post('/logout',logOut);

export default authRouter;