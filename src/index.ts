
import cors from 'cors';
import express, { json } from 'express';
import 'express-async-errors';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import routes from './routes/routes';






const app = express();
app.use(json());
app.use(cors());
app.use(routes);
app.use(errorHandlerMiddleware);

export default app;
