import { MysqlDataSource } from '../config/database';
import CategoryModel from '../library/CategoryInterface';

export function identical(object: CategoryModel, objectRegistered) {
  let objectIdentifier;
  let objectRegisteredIdentifier;

  if (object.enTitle) {
    objectIdentifier = object.enTitle;
    objectRegisteredIdentifier = objectRegistered.enTitle;
  } else {
    objectIdentifier = object.enName;
    objectRegisteredIdentifier = objectRegistered.enName;
  }

  return (
    objectIdentifier == objectRegisteredIdentifier &&
    object.description == objectRegistered.description &&
    object.thumb == objectRegistered.thumb
  );
}

export async function findOneByMarvelId(idMarvel: number, Category) {
  const repository = MysqlDataSource.getRepository(Category);
  const objectRegistered = await repository.findOne({
    where: { idMarvel: idMarvel }
  });
  return objectRegistered;
}

export function addFormattedProperties(object) {
  const condicionalProperties = object.enName
    ? { enName: object.enName, ptName: object.ptName }
    : { enTitle: object.enTitle, ptTitle: object.ptTitle };
  return condicionalProperties;
}

export async function createAndSave(
  objectsArray: Array<CategoryModel>,
  Category
): Promise<void> {
  const repository = MysqlDataSource.getRepository(Category);
  let newObjectsArray: Array<CategoryModel> = [];

  newObjectsArray = objectsArray.map((object) => {
    const newObject = new Category();
    newObject.idMarvel = object.idMarvel;
    newObject.description = object.description;
    newObject.thumb = object.thumb;
    newObject.isTranslated = object.isTranslated;
    newObject.lastUpdate = new Date();
    Object.assign(newObject, addFormattedProperties(object));
    return newObject;
  });
  await repository.manager.save(newObjectsArray);
}

export async function update(
  objectsToUpdate: Array<CategoryModel>,
  Category
): Promise<void> {
  const updatedObjects = objectsToUpdate.map(async (object) => {
    await MysqlDataSource.createQueryBuilder()
      .update(Category)
      .set({
        ...addFormattedProperties(object),
        description: object.description,
        thumb: object.thumb,
        isTranslated: object.isTranslated,
        lastUpdate: new Date()
      })
      .where('idMarvel = :idMarvel', { idMarvel: object.idMarvel })
      .execute();
  });
  await Promise.all(updatedObjects);
}
