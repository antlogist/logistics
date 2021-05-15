<template>
  <v-card flat v-if="!dayOff">
    <v-card-title class="mb-2 justify-center">Default Time Slots</v-card-title>
    <!--Buttons-->
    <v-card-text>
      <v-row class="justify-center">
        <v-btn-toggle rounded>
          <v-btn small @click="dialogSetTimeShow = true">
            <v-icon small>mdi-pen</v-icon>
          </v-btn>
          <v-btn small>
            <v-icon small>mdi-message</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-card-text>

    <v-virtual-scroll :items="timeslots[0]" :item-height="50" height="300">
      <template v-slot:default="{ item }">
        <v-list-item>
          <v-list-item-content class="text-center">
            <v-list-item-subtitle
              >{{ item.start_at }} - {{ item.end_at }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-virtual-scroll>

    <DialogSetTime
      :dialogSetTimeOpen="dialogSetTimeShow"
      @dialogSetTimeClose="dialogSetTimeClose"
    ></DialogSetTime>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DialogSetTime from "@/components/calendar/dialog-day/dd-timeslots/DialogSetTime";
export default {
  name: "DialogDayDefaultTimeSlots",
  props: {
    dayOff: {
      default: () => false,
      type: Boolean
    }
  },
  data: () => ({
    dialogSetTimeShow: false
  }),
  mounted() {
    this.fetchTimeslots();
  },
  computed: {
    ...mapGetters("defaultTimeslots", ["timeslots"])
  },
  methods: {
    ...mapActions("defaultTimeslots", ["setCurrentWeekday", "fetchTimeslots"]),
    dialogSetTimeClose() {
      this.dialogSetTimeShow = false;
    }
  },
  components: {
    DialogSetTime
  }
};
</script>
