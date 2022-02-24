import { RequestConfig } from "../Types";
import AuthorizationResult from "../../AuthorizationResult";

export interface ILoginApiClient {
  login(username: string, password: string): Promise<AuthorizationResult | undefined>;
}