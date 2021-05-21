<template>
  <v-container>
    <v-toolbar class="mb-3" flat style="background-color: ghostwhite">
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

    <v-calendar
      ref="calendar"
      v-model="focus"
      :weekdays="weekday"
      :type="type"
      :events="events"
      @click:date="openDialog"
      @change="fetchEvents"
    >
      <!-- Month day-label template-->
      <template v-slot:day-label="{ present, past, day, date, weekday, month }">
        <template
          v-if="
            past & dayOffs.includes(date) || present & dayOffs.includes(date)
          "
        >
          <!-- If past or today and day off-->
          <div>
            <v-btn color="red lighten-3" fab small elevation="0" class="my-5">{{
              day
            }}</v-btn>
          </div>
        </template>

        <!-- If past or today -->
        <template v-else-if="present || past">
          <!-- If past and not day off-->
          <div>
            <v-btn fab small elevation="0" class="my-5">{{ day }}</v-btn>
          </div>
        </template>

        <template v-else-if="!past && dayOffs.includes(date)">
          <!--If day off and not past-->
          <div>
            <v-btn color="red lighten-3" class="my-5" fab small elevation="0">{{
              day
            }}</v-btn>
          </div>
        </template>

        <template v-else-if="!past && new Date(focus).getMonth() + 1 !== month">
          <div>
            <v-btn color="#f5f5f5" class="my-5" fab small elevation="0">{{
              day
            }}</v-btn>
          </div>
        </template>

        <template v-else>
          <!-- If past or today and day off-->
          <div>
            <v-btn
              @click="openDialog({ date, weekday })"
              color="#9fc51c"
              fab
              small
              elevation="0"
              class="my-5"
              >{{ day }}</v-btn
            >
          </div>
        </template>
      </template>
      <!-- /Month day-label template -->
    </v-calendar>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Booking",
  data: () => ({
    type: "month",
    weekday: [0, 1, 2, 3, 4, 5, 6],
    focus: "",
    events: []
  }),
  mounted() {
    this.fetchTimeslots();
    // Set today
    const now = Date.now();
    const today = new Date(now);
    this.focus = today.toISOString().substring(0, 10);
    this.onMounted(this.focus);
  },
  computed: {
    ...mapGetters("booking", ["timeslots", "dayOffs"])
  },
  methods: {
    ...mapActions("booking", [
      "fetchTimeslots",
      "fetchDayoffs",
      "setCurrentWeekday",
      "openDayDialog",
      "onMounted"
    ]),
    // On Interval changing
    fetchEvents({ start, end }) {
      const monthOne = start.date.substring(0, 7);
      const monthTwo = end.date.substring(0, 7);
      if (monthOne === monthTwo) {
        this.fetchDayoffs([monthOne]);
      } else {
        this.fetchDayoffs([monthOne, monthTwo]);
      }
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    openDialog({ date, weekday }) {
      this.setCurrentWeekday(weekday);
      this.openDayDialog(date);
    }
  }
};
</script>
