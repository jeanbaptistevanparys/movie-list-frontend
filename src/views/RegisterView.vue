<template>
  <main class="login">
    <h1>Sign up</h1>
    <form @submit.prevent method="post">
      <input type="text" placeholder="Username" v-model="username" />
      <input type="password" placeholder="Password" v-model="password" />
      <button @click="register" type="submit">Register</button>
    </form>
    <p>Already have an account? <RouterLink class="link" to="/login">Sign in</RouterLink></p>
  </main>
</template>
<script>
import { RouterLink, useRouter } from 'vue-router';
import AuthService from '@/services/AuthService';
export default {
  name: 'RegisterView',
  components: {
    RouterLink,
  },
  data() {
    return {
      service: new AuthService(),
      router: new useRouter(),
    };
  },
  methods: {
    async register() {
      const response = await this.service.register(this.username, this.password);

      if (response.status !== 201) {
        const data = await response.json();
        alert(data.error);
      } else {
        this.router.push({ name: 'login' });
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
