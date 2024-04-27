<template>
  <AppHeader />
  <main v-if="movie" class="movie">
    <img :src="movie.poster" :alt="movie.title" :title="movie.title" />
    <article>
      <h2>{{ this.movie.title }}</h2>
      <div class="tags">
        <p class="tag">{{ this.movie.year }}</p>
        <p class="tag">{{ this.movie.runtime }}</p>
      </div>
      <p>Director: {{ this.movie.director }}</p>
      <p>Actors: {{ this.movie.actors }}</p>
      <form v-if="score == null" @submit.prevent>
        <div>
          <input type="number" min="0" max="10" v-model="newScore" />
          <p>/10</p>
        </div>
        <input @click="rate()" type="submit" value="Rate!" />
      </form>
      <form v-else @submit.prevent>
        <div>
          <input type="number" min="0" max="10" :value="score" disabled />
          <p>/10</p>
        </div>
        <input @click="unrate()" type="submit" class="unrate" value="Unrate" />
      </form>
    </article>
  </main>
  <div v-else class="loading"></div>
</template>
<script>
import MovieService from '@/services/MovieService.js';
import UserMovieService from '@/services/UserMovieService.js';
import AppHeader from '@/components/AppHeader.vue';
export default {
  name: 'MovieView',
  components: {
    AppHeader,
  },
  data() {
    return {
      MovieService: new MovieService(),
      UserMovieService: new UserMovieService(),
      movie: null,
      score: null,
      newScore: null,
      userName: localStorage.getItem('userName'),
      id: this.$route.params.movieId,
    };
  },
  methods: {
    async rate() {
      if (this.userName === null) {
        this.$router.push({ name: 'login' });
      } else {
        const response = await this.UserMovieService.addUserMovie(
          this.userName,
          this.id,
          this.newScore,
        );

        if (response.status === 401) {
          this.$router.push({ name: 'login' });
        } else if (response.status === 201) {
          await this.getUserMovie();
        }
      }
    },
    async unrate() {
      const response = await this.UserMovieService.deleteUserMovie(this.userName, this.id);

      if (response.status === 401) {
        this.$router.push({ name: 'login' });
      } else if (response.status === 204) {
        this.newScore = null;
        await this.getUserMovie();
      }
    },
    async getUserMovie() {
      const response = await this.UserMovieService.getUserMovie(this.userName, this.id);
      const data = await response.json();

      if (data) {
        this.score = data.score;
      } else {
        this.score = null;
      }
    },
  },
  async mounted() {
    const response = await this.MovieService.getMovie(this.id);
    const data = await response.json();
    if (response.status !== 200) {
      alert(data.error);
    } else {
      this.movie = data;
    }
    this.getUserMovie();
  },
};
</script>
<style scoped>
main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: calc(100vh - 4.5rem);
}
img {
  height: 25rem;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: 1rem;
  user-select: none;
}
article {
  height: 25rem;
  width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
h2 {
  font-size: 2.5rem;
}
p {
  font-size: 1.25rem;
}
.tags {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.tag {
  padding: 0.5rem 1rem;
  background-color: var(--color-green);
  color: white;
  border-radius: 1rem;
}
form {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
form p {
  font-size: 1.5rem;
}
form > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}
input[type='number'] {
  font-size: 1.5rem;
  font-family: inherit;
  padding: 0.75rem;
  border-radius: 1rem;
  background-color: var(--color-gray);
  border: none;
  outline: none;
  width: 5rem;
}
input[type='submit'] {
  font-size: 1.25rem;
  padding: 0.75rem;
  border-radius: 1rem;
  background-color: var(--color-green);
  border: none;
  cursor: pointer;
  font-family: inherit;
  color: white;
  width: 18rem;
}
.unrate {
  background-color: var(--color-red) !important;
}
.loading {
  height: calc(100vh - 4.5rem);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: var(--color-green);
}
</style>
