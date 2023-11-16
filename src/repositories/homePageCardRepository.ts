import { MysqlDataSource } from '../config/database';
import { HomePageCard } from '../entity/HomePageCard';

/**
 * Repository for HomePageCard entity.
 */
export class HomePageCardRepository {
  private repository = MysqlDataSource.getRepository(HomePageCard);

  /**
   * Find all HomePageCards in the database.
   * @returns A promise that resolves to an array of HomePageCards.
   */
  async findAllHomePageCards(): Promise<HomePageCard[]> {
    return this.repository.find();
  }

  /**
   * Find a single HomePageCard by its ID.
   * @param id - The ID of the HomePageCard to find.
   * @returns A promise that resolves to the HomePageCard if found, undefined otherwise.
   */
  async findOneHomePageCard(id: number): Promise<HomePageCard> {
    return this.repository.findOneBy({ id });
  }

  /**
   * Create a new HomePageCard in the database.
   * @param card - The data to create the HomePageCard with.
   * @returns A promise that resolves to the created HomePageCard.
   */
  async createHomePageCard(card: Partial<HomePageCard>): Promise<HomePageCard> {
    const newCard = this.repository.create(card);
    return this.repository.save(newCard);
  }
}
