import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { Repository } from '../repository/userRepository';
import { Gender } from '../lib/genderTypes';

export class UserValidator {
  constructor() {}

  genderTypes(): typeof Gender {
    return Gender;
  }

  validateUserData(req: Request, res: Response, next: NextFunction) {
    const validators = [
      body('name')
        .notEmpty()
        .withMessage('Nome não pode ser vazio')
        .bail()
        .matches(/^[a-zA-Z\s]+$/),

      body('gender')
        .optional() //.notEmpty()
        .withMessage('Gênero não pode ser vazio'),
      /*.bail()
        .isIn(this.genderTypes())
        .withMessage('Selecione um gênero válido')*/ body('birth_date')
        .notEmpty()
        .withMessage('Data de nascimento não pode ser vazio')
        .bail()
        .isDate({
          format: 'Date',
          delimiters: '-',
          strictMode: true
        })
        .withMessage('Informe uma data válida')
        .isBefore(new Date())
        .withMessage('Informe uma data válida'),

      body('email')
        .notEmpty()
        .withMessage('E-mail não pode ser vazio')
        .bail()
        .isEmail()
        .withMessage('Informe um e-mail válido')
        .custom(async (email: string) => {
          const repository = new Repository();
          const existingUser = await repository.findOneByEmail(email);
          if (existingUser) {
            return false;
          }
        })
        .withMessage('E-mail já cadastrado'), /// TESTAR SE FUNCIONA !!!!!!!!!!!!!!!!!!!!

      body('password')
        .notEmpty()
        .withMessage('Informe uma senha')
        .bail()
        .isStrongPassword({
          minLength: 8,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        })
        .withMessage(
          'Senha deve conter no mínimo 8 caracteres e ao menos 1 letra maiúscula, 1 número e 1 carcter especial'
        )
    ];

    for (const validator of validators) {
      validator(req);
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ date: new Date(), status: false, data: errors.array() });
      return;
    }
    next();
  }
}
