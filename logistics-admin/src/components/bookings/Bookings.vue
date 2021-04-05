<template>
  <v-container class="mb-5">
    <!-- Toolbar row -->
    <v-row class="child-flex mb-3">
      <!-- Month selection -->
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
      <!-- /Month selection -->

      <!-- Payment status -->
      <div>
        <v-toolbar flat class="my-3">
          <v-btn-toggle
            class="justify-end mr-1"
            style="width: 100%;"
            v-model="search"
            mandatory
            active-class="filter-btn-active"
          >
            <v-btn
              small
              value="Paid"
              :loading="isShowLoaderTwo"
              :disabled="isShowLoaderTwo"
            >
              <span>Paid</span>
            </v-btn>

            <v-btn
              small
              value="Unpaid"
              :loading="isShowLoaderTwo"
              :disabled="isShowLoaderTwo"
            >
              <span>Unpaid</span>
            </v-btn>
          </v-btn-toggle>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                elevation="1"
                :loading="isShowLoaderTwo"
                :disabled="isShowLoaderTwo"
                @click="getOrderStatuses"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small>mdi-update</v-icon>
              </v-btn>
            </template>
            <span>Check the payment status</span>
          </v-tooltip>
        </v-toolbar>
      </div>
      <!-- /Payment status -->
    </v-row>

    <!-- Table -->
    <v-data-table
      :items-per-page="-1"
      :headers="headers"
      :items="orders"
      class="elevation-1"
      sort-by="orderId"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="index"
            :class="{ active: item.paymentStatus === search }"
          >
            <td>{{ item.orderId }}</td>
            <td>{{ item.start }}</td>
            <td>{{ item.timeslot }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.phone }}</td>
            <td class="text-center">{{ item.paymentStatus }}</td>
            <td>{{ item.status }}</td>
            <td class="text-center">
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
                <v-icon x-small>mdi-truck</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <!-- /Table -->
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Bookings",
  data: () => ({
    search: "Paid",
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
        align: "center",
        sortable: false,
        value: "timeslot",
        width: "155px"
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
        value: "actions",
        width: "100px"
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
    ...mapGetters("calendar", ["dayOffs", "orders"]),
    ...mapGetters(["isShowLoaderTwo"])
  },
  methods: {
    ...mapActions("calendar", [
      "openDayDialog",
      "fetchDayoffs",
      "fetchOrders",
      "updateOrderStatus",
      "fetchOrderInfo",
      "fetchOrdersInfo"
    ]),
    // On Interval changing
    fetchEvents(month) {
      const date = new Date(month);
      const startDate = date.toISOString().substring(0, 10);
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const endYear = endDate.getFullYear();
      const endMonth = ("0" + (endDate.getMonth() + 1).toString()).slice(-2);
      const endDay = endDate.getDate();
      this.fetchOrders({
        startDate: startDate,
        endDate: endYear + "-" + endMonth + "-" + endDay
      });
    },
    updateStatus(id, status) {
      status = status === "pending" ? "done" : "";
      this.updateOrderStatus({
        id: id,
        status: status
      });
    },
    getOrderStatus(orderToken) {
      this.fetchOrderInfo({ orderToken });
    },
    getOrderStatuses() {
      this.fetchOrdersInfo();
    }
  }
};
</script>

<style lang="scss">
tr.active {
  background-color: #d1e68c !important;
  td {
    color: #000;
  }
}
tr {
  td {
    color: gray;
  }
}
</style>
