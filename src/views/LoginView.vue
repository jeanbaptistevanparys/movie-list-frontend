<template>
  <main>
    <h1>Sign in</h1>
    <form @submit.prevent>
      <input type="text" placeholder="Username" v-model="username" />
      <input type="password" placeholder="Password" v-model="password" />
      <button @click="login" type="submit">Login</button>
    </form>
    <p>Don't have an account? <RouterLink to="/register">Sign up</RouterLink></p>
  </main>
</template>
<script>
import { RouterLink, useRouter } from 'vue-router';
import AuthService from '@/services/AuthService';
export default {
  name: 'LoginView',
  components: {
    RouterLink,
  },
  data() {
    return {
      service: new AuthService(),
      router: new useRouter(),
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const response = await this.service.login(this.username, this.password);
      const data = await response.json();
      if (response.status !== 200) {
        alert(data.error);
      } else {
        localStorage.setItem('token', data);
        localStorage.setItem('userName', this.username);
        this.router.push({ name: 'home' });
      }
    },
  },
};
</script>
<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
}
button {
  font-size: 0.875rem;
  line-height: 1rem;
  padding: 0.75rem;
  border-radius: 1rem;
  background-color: var(--color-green);
  border: none;
  cursor: pointer;
  height: fit-content;
  font-family: inherit;
  color: white;
  margin-bottom: 1rem;
}
p {
  font-size: 0.875rem;
}
a {
  color: var(--color-green);
  font-weight: bold;
  text-decoration: none;
}
</style>
