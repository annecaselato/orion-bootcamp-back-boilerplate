import { Request, Response } from 'express';
import { HomePageCardRepository } from '../repositories/homePageCardRepository';
/**
 * @swagger
 * tags:
 *   name: HomePageCards
 *   description: Operations related to home page cards
 *
 * components:
 *   schemas:
 *     HomePageCard:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         title:
 *           type: string
 *         image:
 *           type: string
 *         description:
 *           type: string
 *         access:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */
export class HomePageCardController {
  private homePageCardRepository: HomePageCardRepository;

  constructor(homePageCardRepository: HomePageCardRepository) {
    this.homePageCardRepository = homePageCardRepository;
  }
  /**
   * @swagger
   *   /v1/get-home-page-cards:
   *     get:
   *       summary: Retrieve all home page cards
   *       tags: [HomePageCards]
   *       description: Retrieve all home page cards from the database and return them.
   *       responses:
   *         '200':
   *           description: A list of home page cards
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/HomePageCard'
   *         '400':
   *           description: An error occurred while retrieving the home page cards
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   message:
   *                     type: string
   */
  public async findAllHomePageCards(_req: Request, res: Response): Promise<void> {
    try {
      const homePageCards = await this.homePageCardRepository.findAllHomePageCards();
      res.status(200).send(homePageCards);
    } catch (error) {
      res.status(400).send({ message: 'An error occurred while retrieving the home page cards.' });
    }
  }
}
