import dotenv from 'dotenv';
import app from './index';
dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor funfando de boas na porta: ${PORT}`);
});