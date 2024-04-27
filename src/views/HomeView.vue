<template>
  <AppHeader />
  <main>
    <h2>Search movies</h2>
    <input type="text" v-model="filter" @input="loadMovies" placeholder="Movie name" />
    <div class="movies">
      <VMovie v-for="movie in movies" :movie="movie" :key="movie.id" />
    </div>
  </main>
</template>
<script>
import AppHeader from '@/components/AppHeader.vue';
import VMovie from '@/components/VMovie.vue';
export default {
  name: 'HomeView',
  components: {
    AppHeader,
    VMovie,
  },
  data() {
    return {
      filter: '',
      movies: [
        {
          movieId: 'tt1160419',
          title: 'Dune',
          poster:
            'https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
        },
      ],
    };
  },
  methods: {
    loadMovies() {
      console.log(this.filter);
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
