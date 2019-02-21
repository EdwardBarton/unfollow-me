<template>
  <v-app>
    <v-content class="app">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>

<style>
.app {
  background: #00aced;
}
</style>
