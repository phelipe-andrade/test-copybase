<template>
  <div class="pokemonDetails">
    <div class="img">
      <img
        :src="pokemon.sprites.other.dream_world.front_default"
        :alt="pokemon.name"
      />
    </div>
    <div class="details">
      <h2>{{ pokemon.name }}</h2>
      <ul>
        <li>
          <span>{{ pokemon.types.length > 1 ? "Tipos:" : "Tipo:" }}</span>
          {{ $types.typeList(pokemon.types) }}
        </li>
        <li><span>Altura:</span> {{ (Number(pokemon.height) * 10) / 100 }}m</li>
        <li>
          <span>Peso:</span> {{ Number((pokemon.weight * 100) / 1000) }}Kg
        </li>
        <li class="abilities">
          <span>Habilidades:</span>
          <span
            v-for="({ ability }, index) of pokemon.abilities"
            :key="index"
            >{{ ability.name }}</span
          >
        </li>
      </ul>
    </div>
    <div v-if="dataEvolution">
      <p>{{}}</p>
    </div>
  </div>
</template>

<script>
import { api } from "@/services";
export default {
  name: "PokemonDetails",
  props: ["pokemon"],
  data() {
    return {
      dataEvolution: null,
      evolutions: [],
      error: false,
      test01: 10,
      test02: 20,
    };
  },
  methods: {
    getChainEvolution() {
      api
        .get(`evolution-chain/${this.pokemon.id}`)
        .then((r) => {
          this.dataEvolution = r.data.chain;
          // console.log(r.data.chain);
          this.getEvolutions(r.data.chain);
        })
        .catch(() => {
          this.error = true;
        });
    },
    getEvolutions(data) {
      if (!data) return;
      const namesToEvolution = [];
      let isNext = true;
      let currentEvolution = data;

      do {
        const { species, evolves_to } = currentEvolution;
        if (species.name) namesToEvolution.push(species.name);
        if (evolves_to.length) currentEvolution = evolves_to[0];
        else isNext = false;
      } while (isNext);

      console.log(namesToEvolution);
    },
  },
  created() {
    this.getChainEvolution();
  },
};
</script>

<style scoped>
.pokemonDetails {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 30px;
  background: rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 5px;
}

.img {
  background: #ffffff;
  padding: 20px;
  border-radius: 5px;
}

.img img {
  height: 250px;
  width: auto;
}
.details {
  text-align: start;
}

.details ul {
  background: red;
  width: 100%;
  padding: 15px;
  border-radius: 5px;
}

.details li {
  color: #ffffff;
  font-weight: 600;
}

.details li span {
  font-weight: 400;
  font-size: 0.875rem;
}

h2,
.details li {
  text-transform: capitalize;
}

.abilities span:nth-child(1) {
  margin-right: 5px;
}
.abilities span:nth-child(n + 2) {
  font-weight: 600;
}

.abilities span:nth-child(n + 3)::before {
  content: "|";
  display: inline-block;
  margin: 0 5px;
}
</style>
