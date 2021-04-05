<template>
  <v-dialog v-model="isDayDialogShow" max-width="500px" persistent>
    <v-card>
      <DialogDayToolbar></DialogDayToolbar>
      <v-container>
        <v-row>
          <v-col>
            <v-switch
              v-model="dayOff"
              color="red darken-3"
              label="Day off"
            ></v-switch>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DialogDayToolbar from "@/components/calendar/dialog-day/DialogDayToolbar";
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
    DialogDayToolbar
  }
};
</script>
