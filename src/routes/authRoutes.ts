import { Router } from "express";
import { logging, registering } from "../controllers/authControllers";
import comparingPasswords from "../middlewares/comparingPassword";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { validatingToken } from "../middlewares/validateToken";
import { userRegisterSchema, userLoginSchema } from "../schemas/authSchemas";

const authRoutes = Router();

authRoutes.post('/register',validateSchemaMiddleware(userRegisterSchema), comparingPasswords, registering);
authRoutes.post('/login', validateSchemaMiddleware(userLoginSchema), logging);

export default authRoutes;