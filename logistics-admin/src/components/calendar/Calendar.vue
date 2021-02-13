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
      <v-btn @click="fetchDayoffs($refs.calendar.title)">fetchDayoffs</v-btn>
    </v-toolbar>
    <v-toolbar class="mb-3" flat>
      <v-btn fab x-small color="#9fc51c" @click="$refs.calendar.prev()">
        <v-icon x-small>
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="$refs.calendar">
        {{ $refs.calendar.title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab x-small color="#9fc51c" @click="$refs.calendar.next()">
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
        <template v-slot:day-label="{ past, day, date }">
          <template v-if="past">
            <div style="background-color: #f7f7f7">
              <v-btn fab small elevation="0" @click="openDialog({ date })">{{
                day
              }}</v-btn>
            </div>
          </template>
        </template>
        <template v-slot:day="{ past }">
          <template v-if="past">
            <v-row class="fill-height" style="background-color: #f7f7f7">
            </v-row>
          </template>
        </template>
      </v-calendar>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
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
  methods: {
    ...mapActions("calendar", ["openDayDialog", "fetchDayoffs"]),
    fetchEvents({ start, end }) {
      console.log("fetchEvents", start, end);
    },
    openDialog(data) {
      this.openDayDialog(data);
    }
  }
};
</script>
