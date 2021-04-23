<template>
  <v-container class="my-5" id="ordersContainer">
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="5"
      @current-items="currentItems"
      :sort-by="['created_at']"
      :sort-desc="[true]"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          x-small
          class="mr-2"
          style="background: #9fc51c"
          @click="pay(item)"
        >
          Re-order
        </v-btn>
        <v-btn
          x-small
          class="mr-2"
          style="background: #9fc51c"
          @click="pay(item)"
        >
          Pay
        </v-btn>
        <v-btn
          x-small
          class="mr-2"
          style="background: #9fc51c"
          @click="pay(item)"
        >
          Cancel
        </v-btn>
        <v-btn
          x-small
          class="mr-2"
          style="background: #9fc51c"
          @click="pay(item)"
        >
          Edit
        </v-btn>
        <v-btn x-small style="background: #9fc51c" @click="pay(item)">
          View
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    headers: [
      {
        text: "ID",
        align: "center",
        value: "id"
      },
      {
        text: "Date",
        align: "center",
        value: "createdAt"
      },
      {
        text: "Price (£)",
        align: "start",
        value: "totalPrice",
        sortable: false
      },
      {
        text: "Payment Status",
        align: "center",
        value: "paymentStatus",
        sortable: false
      },
      {
        text: "Delivery Date",
        align: "center",
        value: "deliveryDate",
        sortable: false
      },
      {
        text: "Timeslot",
        align: "center",
        value: "deliveryTimeslot",
        sortable: false
      },
      {
        text: "",
        align: "end",
        sortable: false,
        value: "actions"
      }
    ]
  }),
  computed: {
    ...mapGetters("orders", ["orders"])
  },
  methods: {
    ...mapActions("orders", ["fetchOrders", "fetchDelivery"]),
    getOrders(orders) {
      this.fetchOrders(orders);
    },
    pay(item) {
      console.log(item);
    },
    currentItems(orders) {
      if (orders.length > 0) {
        this.fetchDelivery(orders);
      }
    }
  },
  mounted() {
    this.getOrders(
      typeof confirmedOrders === "undefined" ? [] : confirmedOrders.data
    );
  }
};
</script>
