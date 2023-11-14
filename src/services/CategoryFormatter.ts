import CategoryModel from '../library/CategoryInterface';
import { extractAndTryTotranslate } from '../utils/formatterHelpers';
import 'dotenv/config';

export default class CategoryFormatter {
  async extractAndTryTotranslate(
    objectsArray,
    Category
  ): Promise<CategoryModel[]> {
    const formattedObjects: CategoryModel[] = await Promise.all(
      objectsArray.map(async (object) => {
        return await extractAndTryTotranslate(object, Category);
      })
    );
    return formattedObjects;
  }

  // criterios de filtro a serem definidos
  private filterValidElements(formattedObjectsArray): Array<CategoryModel> {
    const filteredArray = formattedObjectsArray.filter((object) => {
      return object.title && object.description && object.thumb;
    });
    return filteredArray;
  }
}
