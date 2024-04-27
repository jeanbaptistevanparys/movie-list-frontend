import { _api } from '@/config';
export default class AuthService {
  async login(name, password) {
    let fullUrl = _api + '/login';
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    });

    return response;
  }

  async register(name, password) {
    let fullUrl = _api + '/register';
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    });

    return response;
  }
}
