<template>
  <div>
    <h1>Rota não encontrada</h1>
    <router-link class="btn" to="/">Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
}
</style>
