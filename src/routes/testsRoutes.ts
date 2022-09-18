import { Router } from "express";

const testsRoutes = Router();

testsRoutes.post('/tests');
testsRoutes.get('/tests/byDiscipline');
testsRoutes.get('/tests/byTeacher');

export default testsRoutes;