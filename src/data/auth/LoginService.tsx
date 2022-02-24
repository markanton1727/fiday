import { ILoginApiClient } from "../../domain/entity/auth/structures/rest/auth/LoginApliClient"
import { RequestConfig } from "../../domain/entity/auth/structures/rest/Types";
import AuthorizationResult from "../../domain/entity/auth/structures/AuthorizationResult";

export default class LoginService {
  loginApiClient: ILoginApiClient;

  constructor(loginApiClient: ILoginApiClient) {
    this.loginApiClient = loginApiClient;
  }

  async Login(username: string, password: string): Promise<AuthorizationResult | undefined> {
    let response = await this.loginApiClient.login(username, password);
    return new Promise((resolve, reject) => {
      if (response?.access_token) {
        resolve ({
          access_token: response?.access_token
        });
      }

      reject(new Error('Credenciales invalidas'))
    });
  }
}