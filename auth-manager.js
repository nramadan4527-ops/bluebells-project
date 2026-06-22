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

      this.token = response.token;
      this.admin = response.admin;

      localStorage.setItem("authToken", this.token);
      localStorage.setItem("admin", JSON.stringify(this.admin));

      return { success: true, admin: this.admin };
    } catch (err) {
      return { success: false, error: err.message };
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
