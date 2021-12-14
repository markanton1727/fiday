import ValidationResult from "../../entity/auth/structures/ValidationResult";
import AuthorizationResult from "../../entity/auth/structures/AuthorizationResult";

export default interface AuthRepository {
  validateCredentials(email: string, password: string): Promise<ValidationResult>;
  login(email: string, password: string, validationKey: string): Promise<AuthorizationResult>;
}