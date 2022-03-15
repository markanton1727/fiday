import { IApiClient } from '../../domain/entity/auth/structures/rest/ApiClient';
import { RequestConfig, HttpHeaders } from '../../domain/entity/auth/structures/rest/Types';
import AuthorizationResult from '../../domain/entity/auth/structures/AuthorizationResult';
import AuthRepository from '../../domain/repository/auth/AuthRepository';
import ValidationResult from '../../domain/entity/auth/structures/ValidationResult';
import { rejects } from 'assert';

export class LoginApiClient implements AuthRepository {
  loginApiClient: IApiClient;

  constructor(loginApiClient: IApiClient) {
    this.loginApiClient = loginApiClient;
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

  async login(username: string, password: string, validationKey: string): Promise<AuthorizationResult> {
    const endPoint:string = 'oauth/token';
    let response:AuthorizationResult = {};

    try {
      if (validationKey !== 'AAA') {
        new Promise((reject) => {
          reject(new Error("Validation key is invalid"));
          return;
        });
      }

      const headers: HttpHeaders = { 
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      const config: RequestConfig = {
        headers: headers
      }

      response = await this.loginApiClient.post<string, AuthorizationResult>(
        `${process.env.REACT_APP_API_BASE_URL}/${endPoint}`,
        `grant_type=password&username=${username}&password=${password}`,
        config
      )
    } catch(exception) {
      console.log(exception);
    }

    return response;
  }
}