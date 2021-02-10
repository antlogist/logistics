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
    </v-toolbar>
    <v-toolbar class="mb-3" flat>
      <v-btn
        fab
        x-small
        color="#9fc51c"
        @click="$refs.calendar.prev()"
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
        @click="$refs.calendar.next()"
      >
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
      :type="type"></v-calendar>
    </v-sheet>
  </v-container>
</template>

<script>
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
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    this.focus = today.toISOString().substring(0, 10);
  },
  methods: {
    fetchEvents() {
      console.log("fetchEvents");
    }
  }
};
</script>
