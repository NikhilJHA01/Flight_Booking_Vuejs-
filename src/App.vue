<template>
  <div id="app">
    <header-nav />
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import HeaderNav from "./components/Header.vue";

export default {
  name: "app",
  components: {
    HeaderNav
  }
};
</script>

<style lang="scss">
@import "../src/scss/main.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary-black;
  background-image: url("/img/background.jpg");
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
