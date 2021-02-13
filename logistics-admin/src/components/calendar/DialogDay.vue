<template>
  <v-dialog v-model="isDayDialogShow" fullscreen persistent>
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
            <v-btn @click="createDayoff(currentDate)">Create</v-btn>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione
            nam fugiat repellat. In ratione ad veniam nihil deleniti velit
            possimus delectus, assumenda ea animi minus repellendus deserunt
            dignissimos qui pariatur!
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
  data: () => ({
    dayOff: false
  }),
  computed: {
    ...mapGetters("calendar", ["isDayDialogShow", "currentDate"])
  },
  methods: {
    ...mapActions("calendar", ["createDayoff"])
  },
  components: {
    DialogDayToolbar
  }
};
</script>
