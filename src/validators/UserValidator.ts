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
  
  public passwordValidate() {
    return [
      body('password')
        .notEmpty()
        .isStrongPassword({
          minLength: 8,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 1,
          minSymbols: 1
        })
        .matches(/^(?=.*[a-zA-Z])/) //Validação para presença de no minimo uma letra no password
        .withMessage('Invalid password'),
        this.errorValidate
    ];
  }
  
  public recoverPasswordValidate() {
    return [
      body('email').trim().isEmail().withMessage('Invalid email'),
      this.errorValidate
    ];
  }
}
