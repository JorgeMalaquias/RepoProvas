import { Router } from "express";
import authRoutes from "./authRoutes";
import testsRoutes from "./testsRoutes";

const routes = Router();

routes.use(authRoutes);
routes.use(testsRoutes);

export default routes;