<template>
  <v-app>
    <v-system-bar color="black" app></v-system-bar>

    <nav-bar></nav-bar>
    <nav-drawer></nav-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/nav/NavBar";
import NavDrawer from "./components/nav/NavDrawer";
export default {
  name: "App",
  data: () => ({}),
  methods: {},
  mounted() {},
  components: {
    NavBar,
    NavDrawer
  }
};
</script>
