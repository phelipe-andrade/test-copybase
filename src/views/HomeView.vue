<template>
  <div class="wrapper" :class="{ active: active }">
    <h1>Procure o Pokemon pelo nome:</h1>
    <SearchPokemon />
  </div>
  <transition mode="out-in">
    <div class="content">
      <div v-if="!loading">
        <PokemonDetails :pokemon="data" v-if="data && data.id" />
        <p v-else-if="error">{{ url }} não encontrado.</p>
      </div>
      <div v-else key="loading">
        <PageLoading />
      </div>
    </div>
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
      loading: false,
      active: false,
    };
  },
  computed: {
    url() {
      const query = this.$route.query.q;
      return `pokemon/${query}`;
    },
  },
  methods: {
    getPokemons() {
      this.active = true;
      this.loading = true;
      this.data = null;
      api
        .get(this.url)
        .then((r) => {
          this.data = r.data;
          console.log(r.data);
        })
        .catch(() => (this.error = true))
        .finally(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    url() {
      this.getPokemons();
    },
  },
  created() {
    this.getPokemons();
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

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  /* background: red; */
  width: 100%;
}
</style>
