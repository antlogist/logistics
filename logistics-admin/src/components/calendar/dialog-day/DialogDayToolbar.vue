<template>
  <v-toolbar dark color="#9fc51c">
    <template>
      <v-toolbar-title>{{ currentDate }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn x-small fab color="grey darken-3" dark @click="closeDialog">
        <v-icon x-small>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DialogDayToolbar",
  computed: {
    ...mapGetters("calendar", ["currentDate"])
  },
  methods: {
    ...mapActions("calendar", ["closeDayDialog"]),
    closeDialog() {
      this.closeDayDialog();
    },
    save() {
      console.log("save");
    }
  }
};
</script>
