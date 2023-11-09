import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { MysqlDataSource } from './config/database';
import { swaggerConfig } from './config/swagger';
import CharactersHandler from './handlers/CharactersHandler';
import FormatHandler from './handlers/FormatHandler';
import { offsetter } from './utils/marvelGetHelpers';
import CharacterRepository from './repository/CharacterRepository';
import routes from './routes';
import cron from 'node-cron';
import CharacterModel from 'library/CharacterInterface';

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

cron.schedule('0 */1 * * *', async function charactersUpdateSchedule() {
  console.log('Running task to update database every 1 hour');
  try {
    const charactershandler = new CharactersHandler();
    const offset = offsetter();
    let charactersData: Array<unknown>;

    do {
      charactersData = await charactershandler.getCharacters(
        offset.next().value
      );

      const formatter = new FormatHandler();
      const characters: CharacterModel[] =
        await formatter.extractAndTryTotranslate(charactersData);

      if (charactersData.length) {
        const characterrepository = new CharacterRepository();
        await characterrepository.updateOrSave(characters);
      }
    } while (charactersData.length);
  } catch (error) {
    console.error(error);
    Promise.reject('Unable to update database. Trying again in 1 hour');
  }
});

const swaggerSpec = swaggerJSDoc(swaggerConfig);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get('/swagger.json', (_req, res) => res.send(swaggerSpec));

console.log(`Add swagger on /swagger`);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});
