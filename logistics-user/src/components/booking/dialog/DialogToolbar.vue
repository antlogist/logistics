<template>
  <v-toolbar dark tile color="#9fc51c">
    <template>
      <v-btn elevation="0" class="grey darken-3 py-1 px-3 rounded"
        >{{ currentDate }}, {{ currentWeekDay }}</v-btn
      >
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
  name: "DialogToolbar",
  data: () => ({}),
  computed: {
    ...mapGetters("booking", ["currentDate"]),
    currentWeekDay() {
      const dateObj = new Date(this.currentDate);
      const weekday = dateObj.toLocaleString("default", { weekday: "short" });
      return weekday;
    }
  },
  methods: {
    ...mapActions("booking", ["closeDayDialog"]),
    closeDialog() {
      this.closeDayDialog();
    },
    save() {
      console.log("save");
    }
  }
};
</script>
