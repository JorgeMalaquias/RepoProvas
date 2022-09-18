import dotenv from 'dotenv';
import express, { json } from 'express';
import 'express-async-errors';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import routes from './routes/routes';




dotenv.config();

const app = express();
app.use(json());
app.use(routes);
app.use(errorHandlerMiddleware);

export default app;
