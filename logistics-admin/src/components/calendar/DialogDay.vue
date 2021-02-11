<template>
  <v-dialog v-model="isDayDialogShow" fullscreen persistent>
    <v-card>
      <DialogDayToolbar></DialogDayToolbar>
      <v-container>
        <v-row>
          <v-col>
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
import { mapGetters } from "vuex";
import DialogDayToolbar from "@/components/calendar/dialog-day/DialogDayToolbar";
export default {
  name: "DialogDay",
  data: () => ({}),
  computed: {
    ...mapGetters("calendar", ["isDayDialogShow"])
  },
  components: {
    DialogDayToolbar
  }
};
</script>
