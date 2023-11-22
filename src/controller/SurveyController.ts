import { Request, Response } from 'express';

/**
 * Classe com operações relacionadas à manipulação e pesquisas de usuários
 */
export default class SurveyController {

    /**
     * Função para envio de response à requisação de verificação de elegibilidade do usuário para realização da pesquisa.
     * 
     * Casos não em que não há elegibilidade tratados no middleware
     * 
     * @param req - Objeto de requisição do Express
     * @param res - Objeto de resposta do Express
     * @returns {Promise<void>} - Retorna promise a ser resolvida quando do envio da resposta à requisição
     */
    async eligible(req?: Request, res?: Response): Promise<void> {
      res
        .status(200)
        .json({ date: new Date(), status: true, data: { eligible: true } });
    }
}  