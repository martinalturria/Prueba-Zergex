import 'reflect-metadata';
import express from 'express';
import cors from "cors";
import { appDataSource } from './appDataSource';
import { requestLoggerMiddleware } from './middlewares/requestLogger';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import cryptocurrencyRoutes from './routes/cryptocurrencyRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLoggerMiddleware);
app.use(errorHandlerMiddleware);

app.use(cors());
app.use('/api', userRoutes);
app.use('/api', cryptocurrencyRoutes);

appDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on Port:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });
