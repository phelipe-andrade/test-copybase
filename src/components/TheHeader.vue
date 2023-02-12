<template>
  <header>
    <router-link to="/">PokeList</router-link>
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
}

a {
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
}
</style>
