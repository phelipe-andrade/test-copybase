<template>
  <div class="wrapper" :class="{ active: active }">
    <h1>Procure o Pokemon pelo nome:</h1>
    <SearchPokemon />
  </div>

  <div class="content">
    <transition mode="out-in">
      <template v-if="!loading">
        <PokemonDetails :pokemon="data" v-if="data && data.id" />
        <p v-else-if="error" class="error">
          <span>{{ this.$route.query.q }}</span> não encontrado.
        </p>
      </template>
      <div v-else key="loading">
        <PageLoading />
      </div>
    </transition>
  </div>
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
    if (this.$route.query.q) this.getPokemons();
  },
};
</script>

<style>
.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 100%;
}

.wrapper.active {
  animation: fade 0.5s forwards;
}

.error span {
  text-transform: uppercase;
  font-weight: bold;
}

@keyframes fade {
  from {
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  to {
    top: 5%;
    transform: translate3d(-50%, -15%, 0);
  }
}

h1 {
  font-size: 1.5rem;
}

.content {
  width: 100%;
  margin: 140px 0px 30px 0;
}

@media screen and (max-width: 768px) {
  .wrapper {
    position: initial;
    top: 0;
    left: 0;
    transform: translate3d(0, 0, 0);
    width: 100%;
    margin-top: 30px;
  }

  .wrapper.active {
    animation: none;
  }

  .content {
    margin-top: 0px;
  }
}

@media screen and (max-width: 480px) {
  h1 {
    font-size: 1.125rem;
  }
}
</style>
