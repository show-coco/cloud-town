export interface IAuthAdapter {
  login(): Promise<{ authId: string; token: string }>;
  logout(): void;
}
