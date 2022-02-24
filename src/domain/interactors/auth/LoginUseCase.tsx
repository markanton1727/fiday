import AuthRepository from "../../repository/auth/AuthRepository";
import AuthHolder from "../../entity/auth/models/AuthHolder";
import { loginService } from "../../../data/Services";

export default class LoginUseCase {
  private authRepository: AuthRepository;
  private authHolder: AuthHolder;

  public constructor(authRepository: AuthRepository, authHolder: AuthHolder){
    this.authRepository = authRepository;
    this.authHolder =  authHolder;
  }

  public async loginUser(email: string, password: string): Promise<void> {
    const validationResult = await this.authRepository.validateCredentials(email, password);
    const authResult = await this.authRepository.login(
      email,
      password,
      validationResult.validationKey
    );

    this.authHolder.onSignedIn(authResult.access_token);
  }
}