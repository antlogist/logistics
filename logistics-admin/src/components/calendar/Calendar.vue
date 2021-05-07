<template>
  <v-container class="mb-5">
    <!-- Toolbar row -->
    <v-row class="child-flex">
      <!-- Month selection -->
      <div>
        <v-toolbar flat class="my-3 d-flex justify-center">
          <v-select
            v-model="type"
            :items="types"
            dense
            outlined
            hide-details
            class="ma-2"
            label="type"
            style="max-width: 320px;"
            color="#9fc51c"
          ></v-select>
        </v-toolbar>
      </div>
      <!-- /Month selection -->

      <!-- Payment status -->
      <div>
        <v-toolbar flat class="my-3">
          <!-- Sorting by payment status -->
          <v-btn-toggle
            class="justify-end mr-1"
            style="width: 100%;"
            v-model="setFilter"
            active-class="filter-btn-active"
          >
            <v-btn
              small
              elevation="1"
              value="Paid"
              :loading="isShowLoaderTwo"
              :disabled="isShowLoaderTwo"
            >
              <span>Paid</span>
            </v-btn>

            <v-btn
              small
              elevation="1"
              value="Unpaid"
              :loading="isShowLoaderTwo"
              :disabled="isShowLoaderTwo"
            >
              <span>Unpaid</span>
            </v-btn>
          </v-btn-toggle>
          <!-- Sorting by payment status -->

          <!-- Status checking -->
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
          <!-- / Status checking -->
        </v-toolbar>
      </div>
      <!-- /Payment status -->
    </v-row>
    <!-- /Toolbar row -->

    <!-- Month selection -->
    <v-toolbar class="mb-3" flat>
      <v-btn
        fab
        x-small
        color="#9fc51c"
        @click="prev"
        :loading="isShowLoaderTwo"
        :disabled="isShowLoaderTwo"
      >
        <v-icon x-small>
          mdi-chevron-left
        </v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-toolbar-title v-if="$refs.calendar">
        {{ $refs.calendar.title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        fab
        x-small
        color="#9fc51c"
        @click="next"
        :loading="isShowLoaderTwo"
        :disabled="isShowLoaderTwo"
      >
        <v-icon x-small>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </v-toolbar>
    <!-- / Month selection -->

    <!-- Calendar -->
    <v-sheet height="600">
      <!-- Calendar body -->
      <v-calendar
        ref="calendar"
        v-model="focus"
        :type="type"
        :events="orders"
        @click:event="showEvent"
        @click:date="openDialog"
        @click:more="viewDay"
        @change="fetchEvents"
      >
        <!-- Month day-label template-->
        <template v-slot:day-label="{ today, past, day, date }">
          <template v-if="past & !dayOffs.includes(date)">
            <!-- If past and not day off-->
            <div>
              <v-btn fab small elevation="0" @click="openDialog({ date })">{{
                day
              }}</v-btn>
            </div>
          </template>

          <template v-else-if="!past & dayOffs.includes(date)">
            <!--If day off and not past-->
            <div>
              <v-btn
                color="red lighten-3"
                fab
                small
                elevation="0"
                @click="openDialog({ date })"
                >{{ day }}</v-btn
              >
            </div>
          </template>

          <template v-else-if="past & dayOffs.includes(date)">
            <!--If day off and past-->
            <div>
              <v-btn
                color="red lighten-3"
                fab
                small
                elevation="0"
                @click="openDialog({ date })"
                >{{ day }}</v-btn
              >
            </div>
          </template>
        </template>
        <!-- /Month day-label template -->

        <!-- Week and day-label template -->
        <template v-slot:day-label-header="{ today, past, day, date }">
          <template v-if="past & !dayOffs.includes(date)">
            <!-- If past and not day off-->
            <div>
              <v-btn fab small elevation="0" @click="openDialog({ date })">{{
                day
              }}</v-btn>
            </div>
          </template>

          <template v-else-if="!past & dayOffs.includes(date)">
            <!--If day off and not past-->
            <div>
              <v-btn
                color="red lighten-3"
                fab
                elevation="0"
                @click="openDialog({ date })"
                >{{ day }}</v-btn
              >
            </div>
          </template>

          <template v-else-if="past & dayOffs.includes(date)">
            <!--If day off and past-->
            <div>
              <v-btn
                color="red lighten-3"
                fab
                elevation="0"
                @click="openDialog({ date })"
                >{{ day }}</v-btn
              >
            </div>
          </template>
        </template>
        <!-- / Week and day-label template -->

        <!-- Event name -->
        <template v-slot:event="{ event }">
          <div :style="{ color: event.nameColor }">{{ event.name }}</div>
        </template>
        <!-- / Event name -->
      </v-calendar>
      <!-- /Calendar body -->

      <!-- Event menu -->
      <v-menu
        v-model="selectedOpen"
        left
        :activator="selectedElement"
        :close-on-click="false"
        :close-on-content-click="false"
      >
        <EventCard
          :selectedEvent="selectedEvent"
          @getStatus="getOrderStatus"
          @closeEvent="selectedOpen = false"
        >
        </EventCard>
      </v-menu>
      <!-- /Event menu -->
    </v-sheet>
    <!-- /Calendar -->
  </v-container>
</template>

<script>
import EventCard from "@/components/calendar/event/EventCard";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Calendar",
  data: () => ({
    type: "month",
    types: ["month", "week", "day", "4day"],
    mode: "stack",
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      {
        text: "Sun - Sat",
        value: [0, 1, 2, 3, 4, 5, 6]
      },
      {
        text: "Mon - Sun",
        value: [1, 2, 3, 4, 5, 6, 0]
      },
      {
        text: "Mon - Fri",
        value: [1, 2, 3, 4, 5]
      },
      {
        text: "Mon, Wed, Fri",
        value: [1, 3, 5]
      }
    ],
    focus: "",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false
  }),
  mounted() {
    // Set today
    const now = Date.now();
    const today = new Date(now);
    this.focus = today.toISOString().substring(0, 10);
  },
  computed: {
    ...mapGetters("calendar", ["dayOffs", "orders", "paymentFilterValue"]),
    ...mapGetters(["isShowLoaderTwo"]),
    setFilter: {
      get() {
        return this.paymentFilterValue;
      },
      set(filter) {
        this.setPaymentFilter({ value: filter });
      }
    }
  },
  methods: {
    ...mapActions("calendar", [
      "openDayDialog",
      "fetchDayoffs",
      "fetchOrders",
      "setPaymentFilter",
      "fetchOrderInfo",
      "fetchOrdersInfo"
    ]),
    ...mapActions("timeslots", [
      "setCurrentWeekday",
      "setCurrentDate",
      "fetchTimeslots"
    ]),
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    // On Interval changing
    fetchEvents({ start, end }) {
      this.fetchOrders({ startDate: start.date, endDate: end.date });
      const monthOne = start.date.substring(0, 7);
      const monthTwo = end.date.substring(0, 7);
      if (monthOne === monthTwo) {
        this.fetchDayoffs([monthOne]);
      } else {
        this.fetchDayoffs([monthOne, monthTwo]);
      }

      console.log(monthOne, monthTwo);
    },
    openDialog(data) {
      this.setCurrentWeekday(data.weekday);
      this.setCurrentDate(data.date);
      this.fetchTimeslots(data.date);
      this.openDayDialog(data);
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    getOrderStatus(orderToken) {
      this.fetchOrderInfo({ orderToken });
    },
    getOrderStatuses() {
      this.fetchOrdersInfo();
    }
  },
  components: {
    EventCard
  }
  //  watch: {
  //    orders: function(orders) {
  //      if (this.selectedEvent.id) {
  //        const id = this.selectedEvent.id;
  //        orders.some(event => {
  //          if (event.id === id) {
  //            this.selectedEvent = event;
  //          }
  //        });
  //      }
  //    }
  //  }
};
</script>

<style>
.filter-btn-active {
  background-color: #9fc51c !important;
}
</style>
