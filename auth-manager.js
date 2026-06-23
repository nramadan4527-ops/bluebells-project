// ===== Authentication Manager =====

class AuthManager {
  constructor() {
    this.token = localStorage.getItem("authToken");
    this.admin = JSON.parse(localStorage.getItem("admin") || "{}");
  }

  async login(username, password) {
    try {
      const response = await AuthAPI.login(username, password);
      
      if (response.error) {
        throw new Error(response.error);
      }

      if (!response.token) {
        throw new Error("No token returned from server");
      }

      this.token = response.token;
      this.admin = response.admin || {};

      localStorage.setItem("authToken", this.token);
      localStorage.setItem("admin", JSON.stringify(this.admin));

      // Optionally verify token with backend
      try {
        const verify = await AuthAPI.verify(this.token);
        if (verify && verify.valid !== true) {
          // token not valid
          this.logout();
          throw new Error("Token verification failed");
        }
      } catch (verr) {
        // ignore verification errors here but ensure we don't leave a bad token
        this.logout();
        throw new Error(verr.message || "Token verification error");
      }

      return { success: true, admin: this.admin };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  async verifyToken() {
    try {
      const token = this.getToken();
      if (!token) return { valid: false };
      const res = await AuthAPI.verify(token);
      return res;
    } catch (err) {
      return { valid: false, error: err.message };
    }
  }

  async register(username, email, password) {
    try {
      const response = await AuthAPI.register(username, email, password, this.token);
      
      if (response.error) {
        throw new Error(response.error);
      }

      return { success: true, admin: response.admin };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  logout() {
    this.token = null;
    this.admin = {};
    localStorage.removeItem("authToken");
    localStorage.removeItem("admin");
  }

  isLoggedIn() {
    return !!this.token;
  }

  getToken() {
    return this.token;
  }

  getAdmin() {
    return this.admin;
  }
}

const Auth = new AuthManager();
