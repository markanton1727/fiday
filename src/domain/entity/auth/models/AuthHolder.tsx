import AuthListener from "./AuthListener";

export default class AuthHolder {
  private authListeners: AuthListener[];
  private isAuthorized: boolean;
  private authToken?: string;

  public constructor() {
    this.isAuthorized = false;
    this.authListeners = [];
    this.authToken = '';
  }

  public onSignedIn(authToken?: string): void {
    this.isAuthorized = true;
    this.authToken = authToken;
    this.notifiyListeners();
  }

  public onSignedOut(): void {
    this.isAuthorized = false;
    this.authToken = '';
    this.notifiyListeners();
  }

  public isUserAuthorized(): boolean {
    return this.isAuthorized;
  }

  public addAuthListener(authListener: AuthListener): void {
    this.authListeners.push(authListener)
  }

  public removeAuthListener(authListener: AuthListener): void {
    this.authListeners.splice(this.authListeners.indexOf(authListener), 1)
  }

  private notifiyListeners(): void {
    this.authListeners.forEach((listener) => listener.onAuthChanged());
  }
}