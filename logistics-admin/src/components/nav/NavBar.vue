<template>
  <div>
    <v-app-bar color="#9fc51c" dark dense flat app>
      <v-app-bar-nav-icon @click.stop="onIconClick"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NavBar",
  methods: {
    ...mapActions(["toggleDrawer"]),
    onIconClick() {
      this.toggleDrawer(true);
    }
  },
  components: {}
};
</script>
<style></style>
