import { MysqlDataSource } from '../config/database';
import { Quote } from './../entity/Quotes';

/**
 * Repository handling Quote-related database queries.
 */
export class QuoteRepository {
  /**
   * Retrieves all quotes from the database.
   *
   * @returns {Promise<Quote[]>} Array of Quote objects.
   */
  public static async getQuotes(page?: number, limit?: number): Promise<Quote[]> {
    if (page && limit) {
      const offset = (page - 1) * limit;
      const quotes = await MysqlDataSource.getRepository(Quote).find({
        skip: offset,
        take: limit
      });
      return quotes;
    }
    return MysqlDataSource.getRepository(Quote).find();
  }

  /**
   * Retrieves a quote by its ID.
   *
   * @param id - The ID of the quote.
   * @returns {Promise<Quote | undefined>} A single Quote object or undefined if not found.
   */
  public static async getQuoteById(id: number): Promise<Quote | undefined> {
    return MysqlDataSource.getRepository(Quote).findOneBy({ id });
  }

  /**
   * Retrieves a specified number of random quotes.
   *
   * @param count - The number of random quotes to retrieve.
   * @returns {Promise<Quote[]>} Array of random Quote objects.
   */
  public static async getRandomQuotes(count: number): Promise<Quote[]> {
    return MysqlDataSource.getRepository(Quote).createQueryBuilder().orderBy('RAND()').limit(count).getMany();
  }

  /**
   * Retrieves a specified number of quotes in a paginated manner.
   *
   * @param page - The page number.
   * @param limit - The number of quotes per page.
   * @returns {Promise<Quote[]>} Array of paginated Quote objects.
   */
  // public static async getPaginatedQuotes(page: number, limit: number): Promise<Quote[]> {
  //   const offset = (page - 1) * limit;
  //   const quotes = await MysqlDataSource.getRepository(Quote).find({
  //     skip: offset,
  //     take: limit
  //   });

  //   return quotes;
  // }
}
