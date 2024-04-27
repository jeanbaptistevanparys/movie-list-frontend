<template>
  <div class="movie">
    <p v-if="movie.score">{{ movie.score }}/10</p>
    <RouterLink :to="{ path: `/movie/${movie.movieId}` }">
      <img :src="movie.poster" :alt="movie.title" />
    </RouterLink>
    <button v-if="isOwner" @click="removeMovie">Remove</button>
  </div>
</template>
<script>
import UserMovieService from '@/services/UserMovieService.js';
export default {
  name: 'VMovie',
  props: {
    movie: {
      required: true,
    },
  },
  data() {
    return {
      UserMovieService: new UserMovieService(),
      loggedInUserName: null,
      isOwner: false,
    };
  },
  mounted() {
    this.loggedInUserName = localStorage.getItem('userName');
    if (
      this.loggedInUserName &&
      this.movie.userName &&
      this.loggedInUserName === this.movie.userName
    ) {
      this.isOwner = true;
    }
  },
  methods: {
    async loadMovies() {
      this.loading = true;
      if (this.filter !== '') {
        const response = await this.service.getMovies(this.filter);
        const data = await response.json();
        if (response.status !== 200) {
          alert(data.error);
        } else {
          this.movies = data;
        }
      } else {
        this.movies = [];
      }
      this.loading = false;
    },
    async removeMovie() {
      const response = await this.UserMovieService.deleteUserMovie(
        this.loggedInUserName,
        this.movie.movieId,
      );
      if (response.status === 401) {
        this.$router.push({ name: 'login' });
      }
    },
  },
};
</script>
<style scoped>
.movie {
  display: flex;
  position: relative;
}

p {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  color: white;
  background-color: var(--color-green);
  padding: 0.5rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
}

a {
  line-height: 0;
}

img {
  width: 10rem;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: 1rem;
  user-select: none;
}

button {
  position: absolute;
  left: 0.25rem;
  bottom: 0.25rem;
  width: calc(100% - 0.5rem);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  line-height: 1rem;
  padding: 0.5rem;
  background-color: var(--color-red);
  border: none;
  cursor: pointer;
  height: fit-content;
  font-family: inherit;
  color: white;
  user-select: none;
}
</style>
