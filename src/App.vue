<template>
  <theHeader />
  <main id="main">
    <router-view v-slot="{ Component }">
      <!-- <transition mode="out-in"> -->
      <component :is="Component"></component>
      <!-- </transition> -->
    </router-view>
  </main>
  <TheFooter />
</template>

<script>
import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";

export default {
  name: "App",
  components: {
    TheFooter,
    TheHeader,
  },
};
</script>

<style>
@import url("https://fonts.cdnfonts.com/css/pokemon-solid");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

* {
  box-sizing: border-box;
}

body,
ul,
li,
h1,
h2,
p {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

body {
  font-family: "Poppins", sans-serif;
  color: #201e1e;
}

a {
  color: #201e1e;
  list-style: none;
  text-decoration: none;
}

#app {
  display: flex;
  min-height: 105vh;
  flex-direction: column;
  align-items: center;
}

#main {
  width: 995px;
  flex: 1;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background: none;
  border-radius: 4px;
  color: #201e1e;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
  border: 2px solid #201e1e;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}

.btn:hover {
  background: #ed3237;
  border: 2px solid #ed3237;

  color: #fff;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}

@media screen and (max-width: 1025px) {
  #main {
    width: 739px;
  }
}

@media screen and (max-width: 768px) {
  #main {
    width: 450px;
    flex-direction: column;
  }
}

@media screen and (max-width: 480px) {
  #main {
    width: 330px;
  }
}
</style>
