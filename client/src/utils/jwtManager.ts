const jwtKey = "jwt";
const authIdKey = "AuthID";

class TokenManager {
  private token: string | null = null;
  private authId: string | null = null;

  setToken(token: string, authId: string) {
    this.token = token;
    this.authId = authId;
    localStorage.setItem(jwtKey, token);
    localStorage.setItem(authIdKey, authId);
  }

  getToken() {
    if (this.token === null || this.authId === null) {
      this.token = localStorage.getItem(jwtKey);
      this.authId = localStorage.getItem(authIdKey);
    }
    return {
      token: this.token,
      authId: this.authId,
    };
  }

  clear() {
    this.token = null;
    this.authId = null;
    localStorage.removeItem(jwtKey);
    localStorage.removeItem(authIdKey);
  }
}

export const tokenManager = new TokenManager();
