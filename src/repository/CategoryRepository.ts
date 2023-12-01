import { MysqlDataSource } from '../config/database';
import CategoryModel from 'models/CategoryInterface';

/**
 * Classe que implementa operações de criação e manipulação de categorias nos respectivos databases
 * (Character | Comic | Event | Series | Story).
 */
export default class CategoryRepository {
  /**
   * Função de criação e atualização de registros de categorias nos respectivos databases
   * @async
   * @param {CategoryModel[]} objectsArray - Array de objetos do tipo CategoryModel
   * @param {Character | Comic | Event | Series | Story} Category - Instância de entidade de categoria
   * @returns {Promise<void>} - Retorna promise a ser resolvida quando da criação/atualização de registro da categoria
   */
  async updateOrSave(
    formattedArray: CategoryModel[],
    Category,
    categoryAlias
  ): Promise<void> {
    const repository = MysqlDataSource.getRepository(Category);

    // retorna array de objetos com relação de id e respectivo idMarvel
    const idAndIdMarvel = await repository
      .createQueryBuilder(`${categoryAlias}`)
      .select(`${categoryAlias}.id`)
      .addSelect(`${categoryAlias}.idMarvel`)
      .where(`${categoryAlias}.idMarvel IN (:...idsMarvel)`, {
        idsMarvel:
          formattedArray.length > 0
            ? formattedArray.map((category) => {
                return category.idMarvel;
              })
            : [-1]
      })
      .getRawMany();

    // retorna objeto e id para objetos a serem atualizados já existentes no banco
    const objectsArray = formattedArray.map((object) => {
      const corresponding = idAndIdMarvel.find(
        (obj) => obj[`${categoryAlias}_idMarvel`] == object.idMarvel
      );

      const id = corresponding ? corresponding[`${categoryAlias}_id`] : null;

      if (id) {
        return { id: id, ...object };
      } else {
        return object;
      }
    });

    /**
     * Se houver dados a serem criados/atualizados, insere no database da entidade da categoria correspondente os valores definidos nos objetos contidos no array.
     * Caso já exista registro de categoria de mesmo valor 'idMarvel', os dados do registro serão atualizados.
     */
    if (objectsArray.length > 0)
      await repository.upsert(objectsArray, ['idMarvel']);
  }
}
