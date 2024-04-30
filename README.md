# Vue.js Options API Workshop: Movie watch list

## Requirements

- [Node](https://nodejs.org/en/download) (v20)
- [Docker Engine](https://docs.docker.com/engine/install/) (Docker Desktop)

## Setup

### Server setup

Clone de server en installeer dependencies

```sh
git clone git@github.com:jarivalentine/movie-list-backend.git
```

```sh
cd movie-list-backend
```

```sh
npm install
```

Database setup

```sh
cp example.env .env
```

```sh
docker compose up -d
```

```sh
npx prisma migrate dev
```

Vraag een OMDb API key aan
1. Ga naar https://www.omdbapi.com/apikey.aspx
2. Klik op FREE, vul in en submit
3. Ga naar je email inbox en activeer de API key
4. Paste de API key als value voor `API_KEY` in de `.env` file

Start de server

```sh
npm run dev
```

### Client setup

Clone de client en installeer dependencies

```sh
git clone git@github.com:jeanbaptistevanparys/movie-list-frontend.git
```

```sh
cd movie-list-frontend
```

```sh
npm install
```

Start de client

```sh
npm run dev
```

## 1  Starten met Vue

### 1.1

Nieuwe file `HomeView.vue` in `views/`

```html
<template>
  <p>Hello World!</p>
</template>
<script>
export default {
  name: 'HomeView',
};
</script>
<style scoped>
/* hier komt de css */
</style>
```

Nieuwe route in `router/index.js` 

```js
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
```

### 1.2

Voeg toe in `HomeView.vue` binnen de `template` tags

```html
  <main>
    <h2>Search movies</h2>
    <input type="text" v-model="filter" @input="loadMovies" placeholder="Movie name" />
  </main>
```

Voeg toe in `HomeView.vue` binnen de `script` tags

```js
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
```

Voeg toe in `HomeView.vue` binnen de `style` tags

```css
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
```

Oplossing

```sh
git checkout 1-starten-met-vue
```

## 2  Components

### 2.1

Voeg toe in `HomeView.vue` binnen de `script` tags voor de `export default`

```js
import AppHeader from '@/components/AppHeader.vue';
```

Voeg toe in `HomeView.vue` binnen de `script` tags als option in `export default`

```js
  components: {
    AppHeader
  }
```

Voeg `<AppHeader />` toe in `HomeView.vue` binnen de `template` tags voor de `main` tags

```html
  <AppHeader />
```

### 2.2

Voeg `VMovie` toe in de components option en import het

```js
import VMovie from '@/components/VMovie.vue'
```

```js
  components: {
    AppHeader,
    VMovie,
  },
```

Voeg toe in `HomeView.vue` binnen de `template` tags onder de `input` tags

```html
    <div class="movies">
      <VMovie v-for="movie in movies" :movie="movie" :key="movie.id" />
    </div>
```

Update de `data()` option in `HomeView.vue`

```js
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
```

Oplossing

```sh
git checkout 2-components
```

## 3 Data Service

### 3.1

Nieuwe file `MovieService.js` in `services/`

```js
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
```

### 3.2

Voeg `MovieService` toe in de data option en import het

```js
  data() {
    return {
      filter: '',
      movies: [],
      movieService: new MovieService(),
    };
  },
```

Nu kunnen we de service gebruiken in de `loadMovies` functie

```js
    async loadMovies() {
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
    },
```

Hoera 🎉 nu heb je echte films op je schermpje en kan je zelf zoeken op films.

### 3.3 Loading en feedback

Voeg `loading` als `false` toe in de data option

```js
data() {
    return {
      filter: '',
      movies: [],
      movieService: new MovieService(),
      loading: false
    }
  },
```

en in de `loadMovies` functie gaan we de loading state toepassen.

```js
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
```

Nu kunnen we de loading state gebruiken in de `template`

```html
    <div v-if="loading" class="loading"></div>
    <p v-else-if="this.movies.length === 0">No movies found</p>
    <div v-else class="movies">
      <VMovie v-for="movie in movies" :movie="movie" :key="movie.id" />
    </div>
```


Profiat 🎉 nu heb je een loading state en een message als er geen films gevonden zijn.

Oplossing

```sh
git checkout 3-data-service
```

## 4 Dynamic routes

### 4.1

Nieuwe route in `router/index.js` 

```js
    {
      path: '/movie/:movieId',
      name: 'movie',
      component: () => import('../views/MovieView.vue'),
    },
```

Voeg toe in `MovieService.js`

```js
  async getMovie(id) {
    let fullUrl = _api + '/movie/' + id;

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  }
```

### 4.2

Voeg toe in `data()` in `MovieView.vue`

```js
      id: this.$route.params.movieId,
```

Voeg nieuwe `mounted()` option toe in `MovieView.vue`

```js
  async mounted() {
    const response = await this.MovieService.getMovie(this.id);
    const data = await response.json();
    if (response.status !== 200) {
      alert(data.error);
    } else {
      this.movie = data;
    }
    this.getUserMovie();
  }
```

Joepie 🎉 nu heb je een detail pagina voor de films en kan je de details van de film zien.

Oplossing

```sh
git checkout 4-dynamic-routes
```

## 5 Finishing touches

### 5.1 Moustache syntax

Voeg toe in `ProfileView.vue` binnen de `main`

```html
    <div class="avatar">{{ userName.substring(0, 1).toUpperCase() }}</div>
    <h2>@{{ userName }}'s list</h2>
```

### 5.2 Emit

Update `removeMovie` in `VMovie.vue`

```js
    async removeMovie() {
      const response = await this.UserMovieService.deleteUserMovie(
        this.loggedInUserName,
        this.movie.movieId,
      );
      if (response.status === 401) {
        this.$router.push({ name: 'login' });
      } else if (response.status === 204) {
        await this.$emit('reload', this.movie.userName);
      }
    },
```

Luister daar het event `reload` dat emit word naar de parrent `ProfileView.vue`

```html
      <VMovie v-for="movie in movies" :movie="movie" @reload="loadMovies" :key="movie.id" />
```


### 5.3 Computed option

Voeg toe in `ProfileView.vue` binnen de `script` tags als option

```js
  computed: {
    emptyResult() {
      return this.movies.length === 0;
    }
  }
```

Update deze if in de `template` tags  

```
    <p v-else-if="emptyResult">No movies found</p>
```

### 5.4 Watch option

Voeg toe in `ProfileView.vue` binnen de `script` tags als option

```js
  watch: {
    '$route.params.username'(newUsername) {
      this.userName = newUsername;
      this.loadMovies(this.userName);
    }
  },
```

Oplossing

```sh
git checkout 6-finishing-touches
```
