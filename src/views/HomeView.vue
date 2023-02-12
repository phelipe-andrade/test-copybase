<template>
  <div class="wrapper" :class="{ active: data }">
    <h1>Procure o Pokemon pelo nome:</h1>
    <SearchPokemon />
  </div>
  <transition mode="out-in">
    <template v-if="data && data.id">
      <PokemonDetails :pokemon="data" />
    </template>
    <template v-else-if="error">
      <p>{{ url }} não encontrado.</p>
    </template>
  </transition>
</template>

<script>
import { api } from "@/services";
import SearchPokemon from "@/components/SearchPokemon.vue";
import PokemonDetails from "@/components/PokemonDetails.vue";

export default {
  name: "HomeView",
  components: {
    SearchPokemon,
    PokemonDetails,
  },
  data() {
    return {
      data: null,
      error: false,
    };
  },
  computed: {
    url() {
      const query = this.$route.query.q;
      return query;
    },
  },
  methods: {
    getPokemons() {
      this.data = [];
      api
        .get(this.url)
        .then((r) => {
          this.data = r.data;
          console.log(r.data);
        })
        .catch(() => (this.error = true));
    },
  },
  watch: {
    url() {
      this.getPokemons();
    },
  },
};
</script>

<style>
.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.wrapper.active {
  animation: fade 0.5s forwards;
}

@keyframes fade {
  from {
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  to {
    top: 5%;
    transform: translate3d(-50%, -5%, 0);
  }
}

h1 {
  font-size: 1.5rem;
}
</style>
