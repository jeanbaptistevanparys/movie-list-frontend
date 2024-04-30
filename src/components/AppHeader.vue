<template>
  <header>
    <RouterLink to="/">
      <h1>Movie List</h1>
    </RouterLink>
    <div v-if="userName">
      <button @click="logout" class="button">Logout</button>
      <RouterLink :to="{ path: `/profile/${userName}` }" class="avatar">
        {{ userName.substring(0, 1).toUpperCase() }}
      </RouterLink>
    </div>
    <RouterLink v-else :to="{ name: `login` }" class="button"> Login </RouterLink>
  </header>
</template>
<script>
import { useRouter } from 'vue-router';
export default {
  name: 'AppHeader',
  data() {
    return {
      router: useRouter(),
      userName: localStorage.getItem('userName'),
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
      this.router.push({ name: 'login' });
    },
  },
};
</script>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

header div {
  display: flex;
  gap: 1rem;
}

a {
  text-decoration: none;
}

h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-green);
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  background-color: rgb(32, 180, 137);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
}

.button {
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-green);
  border: 2px solid var(--color-green);
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  user-select: none;
}
</style>
