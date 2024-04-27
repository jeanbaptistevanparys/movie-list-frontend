import { _api } from '@/config';

export default class MovieService {
  async getMovies(filter) {
    let fullUrl = _api + `/movie?title=${filter}`;

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  }
}
