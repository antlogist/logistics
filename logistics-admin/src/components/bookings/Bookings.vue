<template>
  <v-container class="mb-5">
    <v-row class="child-flex mb-3">
      <div>
        <v-toolbar flat class="my-3 d-flex justify-center">
          <v-dialog
            ref="dialog"
            v-model="modalMonth"
            :return-value.sync="month"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                outlined
                dense
                hide-details
                v-model="month"
                color="#9fc51c"
                label="Select month"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker type="month" v-model="month" color="#7f9e15">
              <v-spacer></v-spacer>
              <v-btn
                class="white--text"
                color="#7f9e15"
                small
                @click="modalMonth = false"
              >
                Cancel
              </v-btn>
              <v-btn
                class="white--text"
                color="#7f9e15"
                small
                @click="
                  fetchEvents(month);
                  modalMonth = false;
                  $refs.dialog.save(month);
                "
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-toolbar>
      </div>

      <div>
        <v-toolbar flat class="my-3">
          <v-btn-toggle
            class="justify-center"
            style="width: 100%;"
            v-model="search"
            mandatory
            active-class="filter-btn-active"
          >
            <v-btn
              small
              value="paid"
              :loading="isShowLoaderTwo"
              :disabled="isShowLoaderTwo"
            >
              <span>Paid</span>
            </v-btn>

            <v-btn
              small
              value="unpaid"
              :loading="isShowLoaderTwo"
              :disabled="isShowLoaderTwo"
            >
              <span>Unpaid</span>
            </v-btn>
          </v-btn-toggle>
        </v-toolbar>
      </div>
    </v-row>

    <v-data-table
      :items-per-page="-1"
      :headers="headers"
      :search="search"
      :items="orders"
      class="elevation-1"
      :custom-filter="filterPaymentStatus"
      sort-by="orderId"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          :loading="isShowLoaderTwo"
          :disabled="isShowLoaderTwo"
          x-small
          fab
          :style="{
            background: item.status === 'done' ? '#7f9e15' : 'lightgray'
          }"
          @click="updateStatus(item.id, item.status)"
        >
          <v-icon x-small>mdi-check</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Bookings",
  data: () => ({
    search: "paid",
    modalMonth: false,
    month: "",
    headers: [
      {
        text: "ID",
        align: "center",
        sortable: true,
        value: "orderId",
        width: "100px"
      },
      {
        text: "Delivery date",
        align: "start",
        sortable: true,
        value: "start",
        width: "125px"
      },
      {
        text: "Timeslot",
        align: "start",
        sortable: false,
        value: "timeslot"
      },
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name",
        width: "100px"
      },
      {
        text: "Address",
        align: "start",
        sortable: true,
        value: "address"
      },
      {
        text: "Phone",
        align: "start",
        sortable: false,
        value: "phone"
      },
      {
        text: "Payment status",
        align: "center",
        sortable: true,
        filterable: true,
        value: "paymentStatus",
        width: "150px"
      },
      {
        text: "Delivery status",
        align: "center",
        sortable: false,
        value: "status",
        width: "150px"
      },
      {
        text: "Actions",
        align: "center",
        sortable: false,
        value: "actions"
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
      "setPaymentFilter",
      "updateOrderStatus"
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
    },
    filterPaymentStatus(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString() === search
      );
    },
    updateStatus(id, status) {
      status = status === "pending" ? "done" : "";
      this.updateOrderStatus({
        id: id,
        status: status
      });
    }
  }
};
</script>
