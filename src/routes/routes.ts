import { Router } from "express";
import cardRoutes from "./cardRoutes";
import credentialRoutes from "./credentialRoutes";
import noteRoutes from "./noteRoutes";
import userRoutes from "./userRoutes";
import wifiRoutes from "./wifiRoutes";

const routes = Router();

routes.use(userRoutes);
routes.use(credentialRoutes);
routes.use(noteRoutes);
routes.use(cardRoutes);
routes.use(wifiRoutes);

export default routes;