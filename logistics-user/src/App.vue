<template>
  <v-app>
    <v-main>
      <Booking></Booking>
    </v-main>
  </v-app>
</template>

<script>
import Booking from "@/components/booking/Booking";
export default {
  name: "App",
  data: () => ({}),
  methods: {},
  mounted() {},
  components: {
    Booking
  }
};
</script>
