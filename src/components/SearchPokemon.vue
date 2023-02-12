<template>
  <form>
    <input
      type="text"
      name="search"
      id="search"
      v-model="search"
      placeholder="Ex: Ditto"
    />

    <button @click.prevent="fetchPokemon" @keydown.enter="fetchPokemon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#201e1e"
          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
      </svg>
    </button>
  </form>
</template>

<script>
export default {
  name: "SerachPokemon",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    fetchPokemon() {
      this.$router.push({ query: { q: this.search.toLocaleLowerCase() } });
      this.search = "";
    },
  },
};
</script>

<style>
form {
  max-width: 400px;
  margin: 15px auto 60px auto;
  display: flex;
}

#search {
  width: 100%;
  padding: 15px;
  border: 1px solid #201e1e;
  overflow: hidden;
}

button {
  width: 50px;
  height: 47px;
  background: none;
  border: 1px solid #201e1e;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

button:hover {
  background: #ed3237;
}

button svg path {
  fill: #201e1e;
  transition: all 0.2s ease-in-out;
}

button:hover svg path {
  fill: #fff;
}
</style>
