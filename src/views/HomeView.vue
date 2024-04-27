<template>
  <AppHeader />
  <main>
    <h2>Search movies</h2>
    <input type="text" v-model="filter" @input="loadMovies" placeholder="Movie name" />
    <div v-if="loading" class="loading"></div>
    <p v-else-if="this.movies.length === 0">No movies found</p>
    <div class="movies">
      <VMovie v-for="movie in movies" :movie="movie" :key="movie.id" />
    </div>
  </main>
</template>
<script>
import AppHeader from '@/components/AppHeader.vue';
import VMovie from '@/components/VMovie.vue';
import MovieService from '@/services/MovieService.js';
export default {
  name: 'HomeView',
  components: {
    AppHeader,
    VMovie,
  },
  data() {
    return {
      filter: '',
      movies: [],
      movieService: new MovieService(),
      loading: false,
    };
  },
  methods: {
    async loadMovies() {
      this.loading = true;
      if (this.filter !== '') {
        const response = await this.movieService.getMovies(this.filter);
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
  },
};
</script>
<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
input {
  font-size: 0.875rem;
  line-height: 1rem;
  padding: 0.75rem;
  border-radius: 1rem;
  background-color: var(--color-gray);
  border: none;
  outline: none;
  width: 15rem;
  margin-bottom: 2rem;
}
.movies {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: calc(5 * 10rem + 4 * 1.5rem);
  margin-bottom: 2rem;
}
</style>
