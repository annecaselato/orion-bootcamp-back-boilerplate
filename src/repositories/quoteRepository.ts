import { MysqlDataSource } from '../config/database';
import { Quote } from './../entity/Quotes';

export class QuoteRepository {
  public static async getAllQuotes(): Promise<Quote[]> {
    return MysqlDataSource.getRepository(Quote).find();
  }

  public static async getQuoteById(id: number): Promise<Quote | undefined> {
    return MysqlDataSource.getRepository(Quote).findOneBy({ id });
  }

  public static async getRandomQuotes(count: number): Promise<Quote[]> {
    return MysqlDataSource.getRepository(Quote).createQueryBuilder().orderBy('RAND()').limit(count).getMany();
  }

  public static async getPaginatedQuotes(page: number, limit: number): Promise<Quote[]> {
    const offset = (page - 1) * limit;
    const quotes = await MysqlDataSource.getRepository(Quote).find({
      skip: offset,
      take: limit
    });

    return quotes;
  }
}
