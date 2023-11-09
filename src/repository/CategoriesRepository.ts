import { MysqlDataSource } from '../config/database';
import identical from '../utils/categoriesRepoHelpers';
import CategorieModel from '../library/Categorielnterface';
import { Comic } from '../entity/Comic';
import { Event } from '../entity/Event';
import { Series } from '../entity/Series';
import { Story } from '../entity/Story';

export default class CategorieRepository {
  private repository = MysqlDataSource.getRepository(X); // ver utilização de enum

  async updateOrSave(objects: Array<CategorieModel>): Promise<void> {
    objects.forEach(async (object: CategorieModel) => {
      const objectRegistered = await this.findOneByMarvelId(object.idMarvel);

      if (!objectRegistered) {
        this.createAndSave(object);
      } else if (identical(object, objectRegistered)) {
        return;
      } else {
        MysqlDataSource.createQueryBuilder()
          .update(X) // ver utilização de enum
          .set({
            title: object.title,
            description: object.description,
            thumb: object.thumb,
            isTranslated: object.isTranslated,
            lastUpdate: new Date()
          })
          .where('idMarvel = :idMarvel', { idMarvel: object.idMarvel })
          .execute();
      }
    });
  }

  private async createAndSave(
    object?: CategorieModel,
    objects?: Array<CategorieModel>
  ): Promise<void> {
    if (objects) {
      objects.forEach((object: CategorieModel) => {
        this.save(object);
      });
    }

    if (object) {
      this.save(object);
    }
  }

  private async save(Object: CategorieModel): Promise<void> {
    const newCategorieObject = new X(); // ver utilização de enum
    newCategorieObject.idMarvel = Object.idMarvel;
    newCategorieObject.title = Object.title;
    newCategorieObject.description = Object.description;
    newCategorieObject.thumb = Object.thumb;
    newCategorieObject.isTranslated = Object.isTranslated;
    newCategorieObject.lastUpdate = new Date();
    await this.repository.manager.save(newCategorieObject);
  }

  private async findOneByMarvelId(idMarvel: number): Promise<X> {
    // ver utilização de enum
    const categorieObjectRegistered = await this.repository.findOne({
      where: {
        idMarvel: idMarvel
      }
    });
    return categorieObjectRegistered;
  }
}
