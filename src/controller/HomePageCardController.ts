import { Request, Response } from 'express';
import { HomePageCardRepository } from '../repositories/homePageCardRepository';
import { create } from 'domain';
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
 *         imageDescription:
 *           type: string
 *         buttonText:
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
  /**
   * @swagger
   *   /v1/get-home-page-cards:
   *     get:
   *       summary: Retrieve all home page cards
   *       security:
   *       - bearerAuth: []
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
  public static async findAllHomePageCards(_req: Request, res: Response): Promise<void> {
    try {
      const homePageCards = await HomePageCardRepository.findAllHomePageCards();
      const renamedHomePageCards = homePageCards.map((card) => ({
        cardId: card.id,
        cardTitle: card.title,
        cardDescription: card.description,
        cardImage: card.image,
        cardImageDescription: card.imageDescription,
        cardButtonText: card.buttonText,
        cardAccess: card.access,
        created_at: card.created_at,
        updated_at: card.updated_at
      }));
      res.status(200).send(renamedHomePageCards);
    } catch (error) {
      res.status(400).send({ message: 'An error occurred while retrieving the home page cards.' });
    }
  }
  /**
   * @swagger
   *  /v1/create-home-page-card:
   *   post:
   *     summary: Create a new HomePageCard
   *     security:
   *     - bearerAuth: []
   *     tags: [HomePageCards]
   *     description: Create a new Home Page Card
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - image
   *               - description
   *               - access
   *             properties:
   *               title:
   *                 type: string
   *               image:
   *                 type: string
   *               description:
   *                 type: string
   *               access:
   *                 type: string
   *     responses:
   *       '201':
   *         description: The HomePageCard was created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/HomePageCard'
   *       '400':
   *         description: An error occurred while creating the home page card
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  public static async createHomePageCard(req: Request, res: Response): Promise<void> {
    try {
      const card = {
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        access: req.body.access
      };
      const homePageCard = await HomePageCardRepository.createHomePageCard(card);
      res.status(201).send(homePageCard);
    } catch (error) {
      res.status(400).send({ message: 'An error occurred while creating the home page card.' });
    }
  }
}
