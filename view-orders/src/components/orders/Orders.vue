<template>
  <v-container class="my-5" id="ordersContainer">
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="5"
      @current-items="currentItems"
      sort-by="id"
      :sort-desc="[true]"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <template v-if="item.status !== 'canceled'">
          <!--If the delivery has already been booked-->
          <v-btn
            v-if="item.deliveryDate"
            x-small
            class="mr-2 payment_button"
            style="background: #9fc51c"
            :loading="isShowLoader"
            :disabled="isShowLoader"
            :order-token="item.orderToken"
            @click="pay(item)"
          >
            Pay
          </v-btn>
          <!--If the delivery has not been booked-->
          <v-btn
            v-else
            x-small
            class="mr-2"
            style="background: #9fc51c"
            :loading="isShowLoader"
            :disabled="isShowLoader"
            :order-token="item.orderToken"
            @click="bookDelivery(item)"
          >
            Pay
          </v-btn>
        </template>
        <v-btn
          v-if="item.status !== 'canceled'"
          x-small
          class="mr-2"
          style="background: #9fc51c"
          :loading="isShowLoader"
          :disabled="isShowLoader"
          @click="cancel(item)"
        >
          Cancel
        </v-btn>
        <v-btn
          v-if="item.status !== 'canceled'"
          x-small
          class="mr-2"
          style="background: #9fc51c"
          :loading="isShowLoader"
          :disabled="isShowLoader"
          @click="editOrder(item)"
        >
          Edit
        </v-btn>
        <v-btn
          x-small
          style="background: #9fc51c"
          :loading="isShowLoader"
          :disabled="isShowLoader"
          @click="view(item)"
        >
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
        value: "status",
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
    ...mapGetters("orders", ["orders"]),
    ...mapGetters(["isShowLoader"])
  },
  methods: {
    ...mapActions("orders", ["fetchOrders", "fetchDelivery", "makePayment", "cancelOrder"]),
    getOrders(orders) {
      this.fetchOrders(orders);
    },
    bookDelivery(item) {
      window.location.href = `./booking.php?order_token=${item.orderToken}`;
    },
    editOrder(item) {
      window.location.href = `./edit-order.php?order_token=${item.orderToken}`;
    },
    pay(item) {
      this.makePayment(item.orderToken);
    },
    cancel(item) {
      this.cancelOrder(item.orderToken);
    },
    view(item) {
      window.location.href = `./order-details.php?order_token=${item.orderToken}`;
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
