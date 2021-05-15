<template>
  <v-dialog v-model="isDayDialogShow" max-width="500px" persistent>
    <v-card>
      <DialogDayToolbar></DialogDayToolbar>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-switch
              v-model="dayOff"
              color="red darken-3"
              label="Day off"
            ></v-switch>
          </v-col>
          <v-col cols="8">
            <DialogDayDefaultTimeSlots
              v-if="timeslots.length === 0"
              :dayOff="dayOff"
            ></DialogDayDefaultTimeSlots>
            <DialogDayTimeSlots v-else :dayOff="dayOff"></DialogDayTimeSlots>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DialogDayToolbar from "@/components/calendar/dialog-day/DialogDayToolbar";
import DialogDayTimeSlots from "@/components/calendar/dialog-day/dd-timeslots/DialogDayTimeSlots";
import DialogDayDefaultTimeSlots from "@/components/calendar/dialog-day/dd-timeslots/DialogDayDefaultTimeSlots";
export default {
  name: "DialogDay",
  data: () => ({}),
  computed: {
    ...mapGetters("calendar", [
      "isDayDialogShow",
      "currentDate",
      "currentDateId",
      "dayOffs"
    ]),
    ...mapGetters("customTimeslots", ["timeslots"]),
    dayOff: {
      get() {
        if (this.dayOffs.includes(this.currentDate)) {
          return true;
        } else {
          return false;
        }
      },
      set(bool) {
        if (bool) {
          this.createDayoff(this.currentDate);
        } else {
          this.deleteDayoff(this.currentDate);
        }
      }
    }
  },
  methods: {
    ...mapActions("calendar", ["createDayoff", "deleteDayoff"])
  },
  components: {
    DialogDayToolbar,
    DialogDayTimeSlots,
    DialogDayDefaultTimeSlots
  }
};
</script>
