import AuthRepository from "../../domain/repository/auth/AuthRepository";
import ValidationResult from "../../domain/entity/auth/structures/ValidationResult";
import AuthorizationResult from "../../domain/entity/auth/structures/AuthorizationResult";
import { loginService } from "../Services";
export default class AuthFakeApi implements AuthRepository {
  validateCredentials(email: string, password: string): Promise<ValidationResult> {
    return new Promise((resolve, reject)=> {
      if (password.length < 5) {
        reject(new Error('Error'));
        return;
      }

      resolve({ 
        validationKey: 'AAA'
      });
    })
  }

  async login(email: string, password: string, validationKey: string): Promise<AuthorizationResult> {
    const response = await loginService.Login(email, password);
    return new Promise((resolve, reject) => {
      if (validationKey === 'AAA' && response?.access_token) {
        resolve ({
          access_token: response?.access_token
        });
      } else {
        reject(new Error('Validation Key is invalid'));
        return;
      }

      reject(new Error('Credenciales invalidas'))
    });
  }
}