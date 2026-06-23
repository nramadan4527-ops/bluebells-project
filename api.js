// ===== Mock Auth API =====
const AuthAPI = {
  async login(username, password) {
    // بيانات أدمن للتجربة
    if (username === "admin" && password === "1234") {
      return {
        token: "ADMIN_TOKEN_123",
        admin: {
          username: "admin",
          role: "super-admin"
        }
      };
    }

    return { error: "Invalid username or password" };
  },

  async register(username, email, password) {
    return {
      admin: {
        username,
        email
      }
    };
  }
};