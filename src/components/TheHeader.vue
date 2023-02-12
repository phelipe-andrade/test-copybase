<template>
  <header>
    <router-link to="/">PokeList</router-link>
    <nav>
      <router-link class="list" to="list">Lista Completa</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>

<style scoped>
header {
  background: #ed3237;
  padding: 15px;
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a {
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
}

nav a {
  font-size: 1rem;
  font-weight: 500;
}

nav a::after {
  content: "";
  display: block;
  width: 0px;
  height: 1px;
  background: #ffffff;
  transition: all 0.2s ease-in-out;
}

nav a:hover::after {
  width: 60%;
}
</style>
