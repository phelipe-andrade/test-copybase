<template>
  <div class="pokemonDetails">
    <div class="img">
      <img
        :src="pokemon.sprites.other.dream_world.front_default"
        :alt="pokemon.name"
      />
    </div>
    <p>{{ pokemon.id }}</p>
  </div>
</template>

<script>
export default {
  name: "PokemonDetails",
  props: ["pokemon"],
};
</script>

<style>
.pokemonDetails {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
</style>
