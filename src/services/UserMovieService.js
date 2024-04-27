import { _api } from '@/config';

export default class UserMovieService {
  async getUserMovies(username) {
    const fullUrl = _api + `/user/${username}/movie`;

    const response = await fetch(fullUrl);

    return response;
  }

  async getUserMovie(username, movieId) {
    const fullUrl = _api + `/user/${username}/movie/${movieId}`;

    const response = await fetch(fullUrl);

    return response;
  }

  async addUserMovie(username, movieId, score) {
    const fullUrl = _api + `/user/${username}/movie`;

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ movieId, score }),
    });

    return response;
  }

  async deleteUserMovie(username, movieId) {
    const fullUrl = _api + `/user/${username}/movie/${movieId}`;

    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    return response;
  }
}
