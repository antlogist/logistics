<template>
  <v-container class="mb-5">
    <v-toolbar flat class="mb-0">
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
      <h5>{{ dayOffs }}</h5>
    </v-toolbar>
    <v-toolbar class="mb-3" flat>
      <v-btn fab x-small color="#9fc51c" @click="prev">
        <v-icon x-small>
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="$refs.calendar">
        {{ $refs.calendar.title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab x-small color="#9fc51c" @click="next">
        <v-icon x-small>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        color="#9fc51c"
        v-model="focus"
        :type="type"
        @click:date="openDialog"
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
                color="red"
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
                color="red"
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
                color="red"
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
                color="red"
                fab
                elevation="0"
                @click="openDialog({ date })"
                >{{ day }}</v-btn
              >
            </div>
          </template>
        </template>
      </v-calendar>
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
    events: []
  }),
  mounted() {
    // Set today
    const now = Date.now();
    const today = new Date(now);
    this.focus = today.toISOString().substring(0, 10);
  },
  computed: {
    ...mapGetters("calendar", ["dayOffs"])
  },
  methods: {
    ...mapActions("calendar", ["openDayDialog", "fetchDayoffs"]),
    // On Interval changing
    fetchEvents({ start, end }) {
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
