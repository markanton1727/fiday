import AuthRepository from "../../domain/repository/auth/AuthRepository";
import ValidationResult from "../../domain/entity/auth/structures/ValidationResult";
import AuthorizationResult from "../../domain/entity/auth/structures/AuthorizationResult";
import { IApiClient } from '../../core/api/ApiClient';
import ApiClient from '../../core/api/ApiClient';
import { ApiConfiguration } from "../../core/api/ApiConfiguration";

export default class AuthFakeApi implements AuthRepository {
  profileApiClient: IApiClient;

  constructor() {
    let conf = new ApiConfiguration();
    this.profileApiClient = new ApiClient(conf);
  }

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

  login(email: string, password: string, validationKey: string): Promise<AuthorizationResult> {
    return new Promise((resolve, reject) => {
      if (validationKey === 'AAA') {
        if (email === 'marco@yop.mail' && password === 'password') {
          resolve ({
            authorizationToken: 'Bearer AAA'
          });
        }
      } else {
        reject(new Error('Validation Key is invalid'));
        return;
      }

      reject(new Error('Credenciales invalidas'))
    });
  }
}