<template>
  <AppHeader />
  <main>
    <div class="avatar">{{ userName.substring(0, 1).toUpperCase() }}</div>
    <h2>@{{ userName }}'s list</h2>
    <div v-if="loading" class="loading"></div>
    <p v-else-if="emptyResult">No movies found</p>
    <div v-else class="movies">
      <VMovie v-for="movie in movies" :movie="movie" @reload="loadMovies" :key="movie.id" />
    </div>
  </main>
</template>
<script>
import AppHeader from '@/components/AppHeader.vue';
import VMovie from '@/components/VMovie.vue';
import UserMovieService from '@/services/UserMovieService.js';
export default {
  name: 'ProfileView',
  components: {
    AppHeader,
    VMovie,
  },
  data() {
    return {
      userName: this.$route.params.username,
      userMovieService: new UserMovieService(),
      loading: false,
      movies: [],
    };
  },
  async mounted() {
    await this.loadMovies(this.userName);
  },
  methods: {
    async loadMovies(userName) {
      this.loading = true;
      const response = await this.userMovieService.getUserMovies(userName);
      const data = await response.json();
      if (response.status !== 200) {
        alert(data.message);
      } else {
        this.movies = data;
      }
      this.loading = false;
    },
  },
  computed: {
    emptyResult() {
      return this.movies.length === 0;
    },
  },
  watch: {
    '$route.params.username'(newUsername) {
      this.userName = newUsername;
      this.loadMovies(this.userName);
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
.avatar {
  width: 10rem;
  height: 10rem;
  font-size: 4rem;
  border-radius: 100%;
  background-color: var(--color-green);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  user-select: none;
  margin-bottom: 2rem;
}
h2 {
  font-size: 1.5rem;
  font-weight: bold;
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
