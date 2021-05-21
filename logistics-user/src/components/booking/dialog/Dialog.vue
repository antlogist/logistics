<template>
  <v-dialog v-model="isDayDialogShow" max-width="500px" persistent>
    <v-card>
      <DialogToolbar></DialogToolbar>
      <v-container v-if="timeslots[currentDate].length > 0">
        <div class="d-flex flex-column justify-center">
          <v-btn
            @click="
              openOrderConfirmation({
                start_at: item.start_at,
                end_at: item.end_at
              })
            "
            color="#9fc51c"
            v-for="(item, index) in timeslots[currentDate]"
            :key="index"
            class="my-1 align-self-center"
            style="width: 225px"
            >{{ convertTime(item.start_at) }} -
            {{ convertTime(item.end_at) }}</v-btn
          >
        </div>
        <h3 class="text-center my-5">Click to confirm your order</h3>
      </v-container>
      <v-container v-else>
        <h3 class="text-center my-5" color="red lighten-3">
          No available slots
        </h3>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DialogToolbar from "@/components/booking/dialog/DialogToolbar";
import { tConvert } from "@/helpers/helpers.js";
export default {
  name: "Dialog",
  data: () => ({}),
  computed: {
    ...mapGetters("booking", ["isDayDialogShow", "timeslots", "currentDate"])
  },
  methods: {
    ...mapActions("booking", ["openOrderDialog", "setCurrentTimeslot"]),
    openOrderConfirmation({ start_at, end_at }) {
      this.setCurrentTimeslot({ start_at, end_at });
      this.openOrderDialog();
    },
    convertTime(time) {
      return tConvert(time);
    }
  },
  components: {
    DialogToolbar
  }
};
</script>
