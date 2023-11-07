import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { MysqlDataSource } from './config/database';
import { swaggerConfig } from './config/swagger';
import CharactersHandler from './handlers/CharactersHandler';
import FormatHandler from './handlers/FormatHandler';
const cron = require("node-cron");
import routes from './routes';

MysqlDataSource.initialize()
  .then(async () => {
    console.log('Database initialized!');
  })
  .catch((err) => {
    console.error('Database Error: ', err);
  });

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));
app.use(routes);

cron.schedule('* 1 * * *', function charactersUpdateSchedule () {
  console.log('Running task to update database every 1 hour');
  try{
    const charactersData = new CharactersHandler().getCharacters();
    try{
      const charactersTranslated = new FormatHandler().extractCharactersAndTryTotranslate(charactersData);
    }catch(error){

    }

  }catch(error){
    console.error('Unable to update database. Trying again in 1 hour');
  }
});

const swaggerSpec = swaggerJSDoc(swaggerConfig);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get('/swagger.json', (_req, res) => res.send(swaggerSpec));

console.log(`Add swagger on /swagger`);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});
