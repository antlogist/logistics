<template>
  <v-app style="background-color: ghostwhite">
    <Loader></Loader>

    <DialogDay></DialogDay>

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
import Loader from "./components/loader/Loader";
import NavBar from "./components/nav/NavBar";
import NavDrawer from "./components/nav/NavDrawer";
import Footer from "./components/footer/Footer";
import DialogDay from "./components/calendar/dialog-day/DialogDay";
export default {
  name: "App",
  data: () => ({}),
  methods: {},
  mounted() {},
  components: {
    Loader,
    NavBar,
    NavDrawer,
    Footer,
    DialogDay
  }
};
</script>
