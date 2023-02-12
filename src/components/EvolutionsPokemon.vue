<template>
  <div class="evolutions">
    <h3>Evolutions</h3>
    <ul>
      <li v-for="evolution of listEvolutions" :key="evolution.id">
        <div class="img">
          <img
            :src="evolution.sprites.other.dream_world.front_default"
            :alt="evolution.name"
          />
        </div>
        <p>{{ evolution.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "EvolutionsPokemon",
  props: ["listEvolutions"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.evolutions {
  width: 100%;
  grid-column-start: 1;
  grid-column-end: -1;
  text-align: center;
  overflow: hidden;
}

ul {
  display: flex;
  justify-content: center;
}

li {
  position: relative;
}

ul li:nth-child(n - 2) {
  margin-right: 30px;
}
.img {
  width: 150px;
  height: 150px;
  padding: 20px;
  border: none;
  border-radius: 50%;
  background: #ffffff;
  position: relative;
}

.img img {
  width: 50%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

p {
  font-size: 1.125rem;
  font-weight: 600;
  text-transform: capitalize;
  margin-top: 10px;
}

.details {
  position: absolute;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  background: green;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 768px) {
  .img {
    margin: 0 auto;
  }

  ul {
    flex-direction: column;
  }

  ul li:nth-child(n - 2) {
    margin-right: 0px;
    margin-bottom: 30px;
  }
}

@media screen and (max-width: 480px) {
}
</style>
