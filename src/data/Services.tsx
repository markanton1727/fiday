import ApiClient from "../core/api/ApiClient";
import LoginService from "./auth/LoginService";
import { LoginApiClient } from "./auth/LoginApiClient";
import { ApiConfiguration } from "../core/api/ApiConfiguration";

const configuration = new ApiConfiguration();

export const loginService = new LoginService(
  new LoginApiClient(
    new ApiClient(configuration)));