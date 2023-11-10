import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { MysqlDataSource } from './config/database';
import { swaggerConfig } from './config/swagger';
import routes from './routes';
import { DataSource } from 'typeorm';
import { NodemailerService } from './library/nodemailerUtils';
import { ErrorMiddleware } from './middlewares/errorMiddleware';

MysqlDataSource.initialize()
  .then(async (connection: DataSource) => {
    await connection.runMigrations();
    console.log('Database initialized!');
  })
  .catch((err) => {
    console.error('Database Error: ', err);
  });

const app = express();

NodemailerService.init();

app.use(express.json());
app.use(cors({ origin: true }));
app.use(routes);
app.use(ErrorMiddleware.handleError);

const swaggerSpec = swaggerJSDoc(swaggerConfig);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get('/swagger.json', (_req, res) => res.send(swaggerSpec));

console.log(`Add swagger on /swagger`);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});
