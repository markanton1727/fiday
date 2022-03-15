import { ApiConfiguration } from "../../core/api/ApiConfiguration";
import AuthRepository from "../../domain/repository/auth/AuthRepository";
import AuthHolder from "../../domain/entity/auth/models/AuthHolder";
import LoginUseCase from "../../domain/interactors/auth/LoginUseCase";
import AuthViewModelImpl from "./auth/AuthViewModelImpl";
import { LoginApiClient } from "../../data/auth/LoginApiClient";
import ApiClient from "../../core/api/ApiClient";

  const configuration = new ApiConfiguration();
  // data layer
  const authRepository = new LoginApiClient(new ApiClient(configuration));
  // domain layer
  const authHolder = new AuthHolder();
  const loginUseCase = new LoginUseCase(authRepository, authHolder);
  // view layer
  export const authViewModel = new AuthViewModelImpl(loginUseCase, authHolder);