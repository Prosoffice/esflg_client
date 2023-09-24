// src/Auth.js

class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(token) {
        localStorage.setItem('token', token);
        this.authenticated = true;
    }

    logout() {
        localStorage.removeItem('token');
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();
