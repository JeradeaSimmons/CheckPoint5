<template>

  <header class="container-fluid no-select" style="background-color: rosybrown ;">
    <div class="row d-flex justify-content-between">
      <div class="col-md-2">
        <router-link :to="{ name: 'Home' }" class="btn text-light bg-black lighten-30 selectable text-uppercase">
          Home
        </router-link>
      </div>
      <div class="col-md-4 text-center">
        <h3>El Network</h3>
      </div>
      <div class="col-md-2">
        <Login />
      </div>
    </div>
  </header>
  <main class="container-fluid  overflow-auto no-select">
    <div class="row my-3">
      <div class="col-md-6">
        <router-view />
      </div>
      <div class="col-md-4">
        <PlugsCard />
      </div>
    </div>
  </main>

</template>

<script>
import { computed } from 'vue';
import { AppState } from './AppState';
import PlugsCard from "./components/PlugsCard.vue";

export default {
    name: "App",
    setup() {
        return {
            appState: computed(() => AppState)
        };
    },
    components: { PlugsCard }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
