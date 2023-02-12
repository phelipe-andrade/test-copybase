<template>
  <div class="pokemonDetails">
    <div class="img">
      <img
        :src="pokemon?.sprites?.other?.dream_world?.front_default"
        :alt="pokemon?.name"
      />
    </div>
    <div class="details">
      <p class="id">#{{ pokemon.id }}</p>
      <h2>{{ pokemon.name }}</h2>
      <ul class="infosGeneral">
        <li>
          <span>{{ pokemon.types.length > 1 ? "Types: " : "Type: " }}</span
          >{{ $types.typeList(pokemon.types) }}
        </li>
        <li><span>Height: </span>{{ (Number(pokemon.height) * 10) / 100 }}m</li>
        <li>
          <span>Weight: </span>{{ Number((pokemon.weight * 100) / 1000) }}Kg
        </li>
        <li class="abilities">
          <span>Abilities:</span>
          <span
            v-for="({ ability }, index) of pokemon.abilities"
            :key="index"
            >{{ ability.name }}</span
          >
        </li>
      </ul>
      <div class="divider"></div>
      <ul class="stats">
        <li
          v-for="({ base_stat, stat }, index) of pokemon.stats"
          :key="base_stat + index"
        >
          <span>{{ stat.name }}: </span>{{ base_stat }}
        </li>
      </ul>
    </div>
    <EvolutionsPokemon :listEvolutions="evolutions" v-if="evolutions.length" />
  </div>
</template>

<script>
import { api } from "@/services";
import EvolutionsPokemon from "@/components/EvolutionsPokemon.vue";

export default {
  name: "PokemonDetails",
  components: {
    EvolutionsPokemon,
  },
  props: ["pokemon"],
  data() {
    return {
      dataEvolution: null,
      evolutions: [],
      error: false,
    };
  },
  methods: {
    getChainEvolution() {
      api
        .get(`evolution-chain/${this.pokemon.id}`)
        .then((r) => {
          this.dataEvolution = r.data.chain;
          this.getEvolutions(r.data.chain);
        })
        .catch(() => {
          this.error = true;
        });
    },
    getEvolutions(data) {
      if (!data) return;
      let isNext = true;
      let currentEvolution = data;

      do {
        const { species, evolves_to } = currentEvolution;
        if (species.name) {
          this.fetchEvolutions(species.name);
        }
        if (evolves_to.length) currentEvolution = evolves_to[0];
        else isNext = false;
      } while (isNext);
    },
    fetchEvolutions(name) {
      api
        .get(`pokemon/${name}`)
        .then((r) => {
          this.evolutions.push(r.data);
        })
        .catch(() => (this.error = true));
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
  grid-template-rows: 1fr auto;
  gap: 30px;
  background: rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 5px;
}

.img {
  padding: 20px;
  border-radius: 5px;
  overflow: hidden;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img img {
  height: 100%;
  width: auto;
}
.details {
  text-align: start;
  position: relative;
}

.details ul {
  width: 100%;
  padding: 15px;
}

.id {
  position: absolute;
  right: 0px;
  font-weight: 600;
  font-size: 1.125rem;
}

.infosGeneral {
  background: red;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding-bottom: 30px !important;
}

.infosGeneral li {
  color: #ffffff;
  font-weight: 600;
}

.infosGeneral li span {
  font-weight: 400;
  font-size: 0.875rem;
}

h2 {
  margin-bottom: 15px;
}

h2,
.infosGeneral li {
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

.stats {
  border: none;
  border-radius: 0px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background: #ffffff;
  padding-top: 30px !important;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.stats li {
  font-weight: 600;
}

.stats li span {
  font-weight: 400;
  font-size: 0.875rem;
}

.divider {
  width: 100%;
  height: 20px;
  background: #201e1e;
  position: relative;
}

.divider::before {
  content: "";
  display: block;
  width: 50px;
  height: 50px;
  background: #ffffff;
  border: 10px solid #201e1e;
}

.divider::after {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 4px solid #201e1e;
}

.divider::after,
.divider::before {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  border-radius: 50%;
}

@media screen and (max-width: 1025px) {
  .pokemonDetails {
    grid-template-columns: 40% 1fr;
    column-gap: 15px;
  }

  .img img {
    height: auto;
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .pokemonDetails {
    grid-template-columns: auto;
    column-gap: 0px;
    row-gap: 15px;
    margin-bottom: 30px;
    max-width: 100%;
  }

  .img img {
    height: 100%;
    width: auto;
  }
}

@media screen and (max-width: 480px) {
  .stats {
    grid-template-columns: 1fr;
  }
}
</style>
