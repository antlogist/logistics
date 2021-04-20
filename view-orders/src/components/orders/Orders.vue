<template>
  <v-container>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi et id
    aperiam obcaecati ab magni, doloribus eos eaque aspernatur numquam ducimus
    rem enim omnis fugiat provident. Officia, magni quasi tempora.
    <h1>{{ orders }}</h1>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapGetters("orders", ["orders"])
  },
  methods: {
    ...mapActions("orders", ["fetchOrders"]),
    getOrders(orders) {
      this.fetchOrders(orders);
    }
  },
  mounted() {
    console.log("mounted"),
      this.getOrders(
        typeof confirmedOrders === "undefined" ? {} : confirmedOrders
      );
  }
};
</script>
