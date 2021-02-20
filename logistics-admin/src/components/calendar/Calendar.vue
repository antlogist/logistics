<template>
  <v-container class="mb-5">
    <v-row class="child-flex">
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

      <div>
        <v-toolbar flat class="my-3">
          <v-btn-toggle
            class="justify-center"
            style="width: 100%;"
            v-model="setFilter"
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
    <v-sheet height="600">
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
        <!--Month label template-->
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
        <!--Week and day label template-->
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

        <template v-slot:event="{ event }">
          <div :style="{ color: event.nameColor }">{{ event.name }}</div>
        </template>
      </v-calendar>
      <v-menu v-model="selectedOpen" left :activator="selectedElement">
        <v-card color="grey lighten-4" flat>
          <v-toolbar color="#9fc51c" light>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon small class="mr-1">
              <v-icon small @click="selectedOpen = false">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list two-line>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#9fc51c">
                  mdi-folder
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{
                  selectedEvent.orderId
                }}</v-list-item-title>
                <v-list-item-subtitle>Order ID</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#9fc51c">
                  mdi-cash-multiple
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{
                  selectedEvent.paymentStatus
                }}</v-list-item-title>
                <v-list-item-subtitle>Payment status</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#9fc51c">
                  mdi-clock
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{
                  selectedEvent.timeslot
                }}</v-list-item-title>
                <v-list-item-subtitle>Timeslot</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#9fc51c">
                  mdi-check-circle
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{
                  selectedEvent.status
                }}</v-list-item-title>
                <v-list-item-subtitle>Status</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#9fc51c">
                  mdi-phone
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ selectedEvent.phone }}</v-list-item-title>
                <v-list-item-subtitle>Phone</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#9fc51c">
                  mdi-email
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ selectedEvent.email }}</v-list-item-title>
                <v-list-item-subtitle>Email</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#9fc51c">
                  mdi-map-marker
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                {{ selectedEvent.address }}
                <v-list-item-subtitle>Address</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-sheet>
  </v-container>
</template>

<script>
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
        this.setPaymentFilter({ value: filter });
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
      this.openDayDialog(data);
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    refreshDayOffs() {
      const date = this.$refs.calendar.lastEnd.date;
      //      const month = date.substring(0, 7);
      console.log(date);
      //      this.fetchDayoffs(month);
    }
  },
  components: {}
};
</script>

<style>
.filter-btn-active {
  background-color: #9fc51c !important;
}
</style>
