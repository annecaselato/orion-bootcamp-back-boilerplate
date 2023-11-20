import { MysqlDataSource } from '../config/database';
import { Character } from '../entity/Character';
import { User } from '../entity/User';

export enum Category {
  Characters = 'characters',
  Comics = 'comics',
  Series = 'series',
  Stories = 'stories',
  Events = 'events'
}

export async function insertNewClickMetric(
  category: Category,
  metricEntry,
  userRepository,
  metricsRepository,
  user_id: number,
  category_id: number
) {
  //find no usuario
  const user: User = await userRepository.findOne({
    where: {
      id: user_id
    }
  });

  if (!user) {
    return {
      statusCode: 404,
      resp: {
        date: new Date(),
        status: false,
        data: 'Usuário não encontrado.'
      }
    };
  }

  //find no personagem
  const character: Character = await metricsRepository.findOne({
    where: {
      id: category_id
    }
  });

  if (!character) {
    return {
      statusCode: 404,
      resp: {
        date: new Date(),
        status: false,
        data: "Recurso da categoria '" + category + "' não encontrado."
      }
    };
  }

  metricEntry.user = user;
  metricEntry.character = character;
  metricEntry.clicks = 1;

  await MysqlDataSource.manager.save(metricEntry);

  return {
    statusCode: 200,
    resp: {
      date: new Date(),
      status: true,
      data:
        'O usuário ' +
        user_id +
        ' selecionou o recurso ' +
        category_id +
        " da categoria '" +
        category +
        "'."
    }
  };
}
