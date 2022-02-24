import { ILoginApiClient } from '../../domain/entity/auth/structures/rest/auth/LoginApliClient';
import { IApiClient } from '../../domain/entity/auth/structures/rest/ApiClient';
import { RequestConfig, HttpHeaders } from '../../domain/entity/auth/structures/rest/Types';
import AuthorizationResult from '../../domain/entity/auth/structures/AuthorizationResult';

export class LoginApiClient implements ILoginApiClient {
  loginApiClient: IApiClient;

  constructor(loginApiClient: IApiClient) {
    this.loginApiClient = loginApiClient;
  }

  async login(username: string, password: string): Promise<AuthorizationResult | undefined> {
    try {
      const headers: HttpHeaders = { 
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      const config: RequestConfig = {
        headers: headers
      }

      const response = await this.loginApiClient.post<string, AuthorizationResult>(
        `http://localhost:3500/oauth/token`,
        `grant_type=password&username=${username}&password=${password}`,
        config
      )
      return response ? response : undefined;
    } catch(exception) {
      console.log(exception);
    }
  }
}