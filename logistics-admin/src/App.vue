<template>
  <v-app>
    <v-system-bar color="black" app></v-system-bar>

    <nav-bar></nav-bar>
    <nav-drawer></nav-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
    
    <Footer></Footer>
    
  </v-app>
</template>

<script>
import NavBar from "./components/nav/NavBar";
import NavDrawer from "./components/nav/NavDrawer";
import Footer from "./components/footer/Footer";
export default {
  name: "App",
  data: () => ({}),
  methods: {},
  mounted() {},
  components: {
    NavBar,
    NavDrawer,
    Footer,
  }
};
</script>
