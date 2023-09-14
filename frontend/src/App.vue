<template>
  <nav
    class="fixed top-0 left-0 right-0 h-13 p-3 z-10 bg-white items-center"
    v-if="$route.name === 'room'"
  >
    <div class="w-full flex">
      <div class="w-1/5 text-left">
        <router-link to="/" @click="exitRoom">Exit</router-link>
      </div>
      <div class="flex-grow text-center w-3/5">
        <h1 class="font-bold text-2xl">Room {{ roomId }}</h1>
      </div>
      <div class="w-1/5"></div>
    </div>
  </nav>

  <router-view />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const roomId = computed(() => store.state.join.roomId);

const exitRoom = () => {
  store.dispatch('join/exitRoom');
};
</script>

<style lang="scss">
#app {
  font-family: 'Inter';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 5px;
  margin-bottom: 20px;

  a {
    text-align: left;
    text-decoration: none;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
