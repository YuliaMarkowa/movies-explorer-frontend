import { MAIN_API_URL } from "../config/config";

class Auth {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return res.text()
        .then((text) => Promise.reject(JSON.parse(text).message));
    }
  
    register({ name, email, password} ) {
      return fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      }).then(this._checkResponse);
    }
  
    authorize({ email, password }) {
      return fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then(this._checkResponse);
    }
  
    getContent() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }).then(this._checkResponse);
    }
  }

  const auth = new Auth({
    baseUrl: MAIN_API_URL,
  });
  
  export default auth;