<template>
  <main>
    <h2>Search movies</h2>
    <input type="text" v-model="filter" @input="loadMovies" placeholder="Movie name" />
  </main>
</template>
<script>
export default {
  name: 'HomeView',
  data() {
    return {
      filter: '',
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
