import * as repoAuxiliary from '../utils/categoryRepoHelpers';
import CategoryModel from 'library/CategoryInterface';

export default class CategoryRepository {
  async updateOrSave(objectsArray: CategoryModel[], Category): Promise<void> {
    const objectsToSave: Array<CategoryModel> = [];
    const objectsToUpdate: Array<CategoryModel> = [];

    for (const object of objectsArray) {
      const objectRegistered = await repoAuxiliary.findOneByMarvelId(
        object.idMarvel,
        Category
      );

      if (!objectRegistered) {
        objectsToSave.push(object);
      } else if (!repoAuxiliary.identical(object, objectRegistered)) {
        objectsToUpdate.push(object);
      }
    }

    if (objectsToSave.length) {
      await repoAuxiliary.createAndSave(objectsToSave, Category);
    }
    if (objectsToUpdate.length) {
      await repoAuxiliary.update(objectsToUpdate, Category);
    }
  }
}
