<template>
  <v-container>
    <v-toolbar class="mb-3" flat>
      <v-btn
        fab
        text
        small
        color="grey darken-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon small>
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-toolbar-title v-if="$refs.calendar">
        {{ $refs.calendar.title }}
      </v-toolbar-title>

      <v-btn
        fab
        text
        small
        color="grey darken-2"
        @click="$refs.calendar.next()"
      >
        <v-icon small>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-sheet height="600">
      <v-calendar ref="calendar" v-model="focus"></v-calendar>
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
