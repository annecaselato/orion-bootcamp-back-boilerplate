import { body } from 'express-validator';
import { ErrorsValidator } from './ErrorsValidator';

export class UsersValidator extends ErrorsValidator {
  public loginValidate() {
    return [
      body('email').trim().notEmpty().isEmail().withMessage('Invalid email'),
      body('password').notEmpty().withMessage('Invalid password'),
      body('rememberMe').isBoolean().withMessage('Invalid rememberMe'),
      this.errorValidate
    ];
  }
  public recoverPasswordValidate() {
    return [
      body('email').trim().notEmpty().isEmail().withMessage('Invalid email'),
      this.errorValidate
    ];
  }
}
