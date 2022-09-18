import { Router } from "express";
import { postingNewTest } from "../controllers/testsControllers";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { validatingToken } from "../middlewares/validateToken";
import { testSchema } from "../schemas/testSchemas";

const testsRoutes = Router();

testsRoutes.post('/tests', validatingToken,validateSchemaMiddleware(testSchema),postingNewTest);
testsRoutes.get('/tests/byDiscipline', validatingToken);
testsRoutes.get('/tests/byTeacher', validatingToken);

export default testsRoutes;