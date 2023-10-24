import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { MysqlDataSource } from './config/database';
import { swaggerConfig } from './config/swagger';
import routes from './routes';
import { User } from './entity/user';

MysqlDataSource.initialize()
  .then(() => {
    console.log('Database initialized!');

    //mock database
    const user = new User();
    user.email = 'teste@teste.com';
    user.password =
      '$2a$12$EbBRVDoDCgptIRmd21X5re06nZbvUd9VurqndqxuIQEiL4OjhCYwG';
    user.isActivated = true;

    MysqlDataSource.manager.save(user);
  })
  .catch((err) => {
    console.error('Database Error: ', err);
  });

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));
app.use(routes);

const swaggerSpec = swaggerJSDoc(swaggerConfig);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get('/swagger.json', (_req, res) => res.send(swaggerSpec));

console.log(`Add swagger on /swagger`);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});
