import { body } from 'express-validator';
import { ErrorsValidator } from './ErrorsValidator';

export class PasswordValidator extends ErrorsValidator {
  public passwordValidate() {
    return [
      body('password')
        .notEmpty()
        .isStrongPassword({
          minLength: 8,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: false,
          pointsPerUnique: 1,
          pointsPerRepeat: 0.5,
          pointsForContainingLower: 10,
          pointsForContainingUpper: 10,
          pointsForContainingNumber: 10,
          pointsForContainingSymbol: 10
        })
        .matches(/^(?=.*[a-zA-Z])/) //Validação para presença de vogal na senha.
        .withMessage('Password Inválido'),
      this.errorValidate
    ];
  }
}
