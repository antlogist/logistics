<template>
  <v-card flat>
    <v-card-title class="mb-2 justify-center">Time Slots (test)</v-card-title>
    <!--Buttons-->
    <v-card-text>
      <v-row class="justify-center">
        <v-btn-toggle v-model="toggle_exclusive" rounded>
          <v-btn small @click="dialogSetTimeShow = true">
            <v-icon small>mdi-plus</v-icon>
          </v-btn>
          <v-btn small>
            <v-icon small>mdi-message</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-card-text>

    <v-virtual-scroll :items="timeslots" :item-height="50" height="300">
      <template v-slot:default="{ item }">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle
              >{{ item.start_at }} - {{ item.end_at }}</v-list-item-subtitle
            >
          </v-list-item-content>

          <div class="d-flex">
            <v-btn icon x-small class="mx-1">
              <v-icon color="orange darken-4">
                mdi-pen
              </v-icon>
            </v-btn>

            <v-btn icon x-small class="mx-1" @click="deleteItem(item.id)">
              <v-icon color="orange darken-4">
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
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
import DialogSetTime from "@/components/calendar/dialog-day/DialogSetTime";
export default {
  name: "DialogTimeSlots",
  data: () => ({
    dialogSetTimeShow: false,
    toggle_exclusive: undefined
  }),
  computed: {
    ...mapGetters("timeslots", ["timeslots"])
  },
  methods: {
    ...mapActions("timeslots", ["deleteTimeslots"]),
    dialogSetTimeClose() {
      this.dialogSetTimeShow = false;
    },
    deleteItem(id) {
      console.log(id);
      this.deleteTimeslots(id);
    }
  },
  components: {
    DialogSetTime
  }
};
</script>
