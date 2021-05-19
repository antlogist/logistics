<template>
  <v-app>
    <Dialog></Dialog>
    <OrderConfirmation></OrderConfirmation>
    <v-main>
      <Booking></Booking>
    </v-main>
  </v-app>
</template>

<script>
import Booking from "@/components/booking/Booking";
import Dialog from "./components/booking/dialog/Dialog";
import OrderConfirmation from "./components/booking/dialog/OrderConfirmation";
export default {
  name: "App",
  data: () => ({}),
  methods: {},
  mounted() {},
  components: {
    Booking,
    Dialog,
    OrderConfirmation
  }
};
</script>
