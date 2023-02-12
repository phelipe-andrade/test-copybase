<template>
  <div class="list" v-if="pokemonList.length">
    <h1>Lista completa</h1>
    <ul v-if="!loading">
      <li v-for="(pokemon, index) of pokemonList" :key="index">
        <CardPokemon :pokemon="pokemon" />
      </li>
    </ul>
    <div v-else key="loading">
      <PageLoading />
    </div>
    <div class="buttons">
      <button v-if="prev" @click.prevent="handleUrl(prev)">Prev</button>
      <button v-if="next" @click.prevent="handleUrl(next)">Next</button>
    </div>
  </div>
</template>

<script>
import { api } from "@/services";
import CardPokemon from "@/components/CardPokemon.vue";

export default {
  name: "ListView",
  components: {
    CardPokemon,
  },
  data() {
    return {
      pokemonList: [],
      prev: "",
      next: "",
      url: "/pokemon",
      loading: false,
    };
  },
  methods: {
    getPokemonList(router) {
      this.loading = true;
      api
        .get(router || this.url)
        .then(({ data }) => {
          this.pokemonList = data.results;
          this.prev = data.previous ? data.previous : "";
          this.next = data.next ? data.next : "";
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => (this.loading = false));
    },
    handleUrl(link) {
      const router = link ? `/pokemon?${link.split("?")[1]}` : "/pokemon";
      this.getPokemonList(router);
    },
  },
  created() {
    this.getPokemonList();
  },
};
</script>

<style scoped>
h1 {
  margin: 20px 0;
}
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.buttons {
  align-self: flex-start;
  margin: 20px 0;
  transition: all 0.3s ease-in-out;
}

.buttons button:last-child {
  margin-left: 10px;
}

button:hover {
  color: #ffffff;
  font-weight: 600;
  border: none;
}

ul {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(20%, 1fr));
  gap: 20px;
}

li {
  background: rgba(0, 0, 0, 0.1);
  padding: 15px;
  border: none;
  border-radius: 5px;
}

@media screen and (max-width: 1025px) {
  ul {
    grid-template-columns: repeat(3, minmax(20%, 1fr));
  }
}

@media screen and (max-width: 768px) {
  ul {
    grid-template-columns: repeat(2, minmax(20%, 1fr));
  }
}

@media screen and (max-width: 480px) {
  ul {
    grid-template-columns: minmax(20%, 1fr);
  }
}
</style>
