<template>
  <v-container>
    <h1>{{ orders }}</h1>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-dialog
          ref="dialog"
          v-model="modalMonth"
          :return-value.sync="month"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="month"
              label="Picker in dialog"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker type="month" v-model="month" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalMonth = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="modalMonth = false">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" class="elevation-1"></v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Bookings",
  data: () => ({
    modalMonth: false,
    month: "",
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "orderId"
      },
      {
        text: "Delivery date",
        align: "start",
        sortable: false,
        value: "date"
      },
      {
        text: "Timeslot",
        align: "start",
        sortable: false,
        value: "timeslot"
      },
      {
        text: "Payment status",
        align: "start",
        sortable: false,
        value: "paymentStatus"
      },
      {
        text: "Delivery status",
        align: "start",
        sortable: false,
        value: "status"
      }
    ]
  }),
  mounted() {
    // Set today
    const now = Date.now();
    const today = new Date(now);
    this.month = today.toISOString().substring(0, 7);
    this.fetchEvents(this.month);
  },
  computed: {
    ...mapGetters("calendar", [
      "dayOffs",
      "orders",
      "ordersInfo",
      "paymentFilterValue"
    ]),
    ...mapGetters(["isShowLoaderTwo"]),
    setFilter: {
      get() {
        return this.paymentFilterValue;
      },
      set(filter) {
        this.setPaymentFilter({
          value: filter
        });
      }
    }
  },
  methods: {
    ...mapActions("calendar", [
      "openDayDialog",
      "fetchDayoffs",
      "fetchOrders",
      "fetchOrdersInfo",
      "setPaymentFilter"
    ]),
    // On Interval changing
    fetchEvents(month) {
      const date = new Date(month);
      const startDate = date.toISOString().substring(0, 10);
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const endYear = endDate.getFullYear();
      const endMonth = ("0" + (endDate.getMonth() + 1).toString()).slice(-2);
      const endDay = endDate.getDate();
      console.log(endYear, endMonth, endDay);
      this.fetchOrders({
        startDate: startDate,
        endDate: endYear + "-" + endMonth + "-" + endDay
      });
    }
  }
};
</script>
