<template>
  <v-app>
    <Dialog></Dialog>
    <v-main>
      <Booking></Booking>
    </v-main>
  </v-app>
</template>

<script>
import Booking from "@/components/booking/Booking";
import Dialog from "./components/booking/dialog/Dialog";
export default {
  name: "App",
  data: () => ({}),
  methods: {},
  mounted() {},
  components: {
    Booking,
    Dialog
  }
};
</script>
