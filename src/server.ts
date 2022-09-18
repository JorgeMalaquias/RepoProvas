import dotenv from 'dotenv';
import express, { json } from 'express';
import 'express-async-errors';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import routes from './routes/routes';
import app from './index';

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Servidor funfando de boas na porta: ${PORT}`);
});