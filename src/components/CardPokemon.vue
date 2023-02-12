<template>
  <div class="card">
    <span class="id">#{{ dataPokemon.id }}</span>
    <div class="img">
      <img
        :src="dataPokemon?.sprites?.other?.dream_world?.front_default"
        :alt="dataPokemon.name"
      />
    </div>
    <div class="details">
      <h2>{{ dataPokemon.name }}</h2>
      <span class="types"
        ><span>{{ dataPokemon?.types?.length > 1 ? "Types: " : "Type: " }}</span
        >{{ $types.typeList(dataPokemon?.types) }}</span
      >
    </div>
  </div>
</template>

<script>
import { api } from "@/services";
export default {
  name: "CardPokemon",
  props: ["pokemon"],
  data() {
    return {
      dataPokemon: {},
    };
  },
  methods: {
    getPokemon() {
      api
        .get(`pokemon/${this.pokemon.name}`)
        .then((r) => {
          this.dataPokemon = r.data;
        })
        .catch((e) => console.log(e));
    },
  },
  created() {
    this.getPokemon();
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  height: 100%;
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
}

.id {
  align-self: flex-end;
}

.img {
  max-width: 100%;
  height: 100px;
}

.img img {
  max-height: 100%;
  width: auto;
}
</style>
