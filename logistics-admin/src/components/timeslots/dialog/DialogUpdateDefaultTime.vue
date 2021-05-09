<template>
  <v-dialog v-model="dialogUpdateTimeOpen" max-width="500px" persistent>
    <v-card>
      <v-toolbar dark tile color="#9fc51c">
        <template>
          <v-btn
            elevation="9"
            class="grey darken-3 py-1 px-3 rounded"
            @click="updateSlotTime({ id, timeStartAt, timeEndAt })"
            >Update Time</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn x-small fab color="grey darken-3" dark @click="close">
            <v-icon x-small>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="11" sm="5">
            <v-menu
              ref="menuStartAt"
              v-model="menuStartAt"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="timeStartAt"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  color="#9fc51c"
                  v-model="timeStartAt"
                  label="Start"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                color="#9fc51c"
                v-if="menuStartAt"
                v-model="timeStartAt"
                full-width
                @click:minute="$refs.menuStartAt.save(timeStartAt)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="11" sm="5">
            <v-menu
              ref="menuEndAt"
              v-model="menuEndAt"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="timeEndAt"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  color="#9fc51c"
                  v-model="timeEndAt"
                  label="End"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                color="#9fc51c"
                v-if="menuEndAt"
                v-model="timeEndAt"
                full-width
                @click:minute="$refs.menuEndAt.save(timeEndAt)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DialogUpdateTime",
  props: {
    dialogUpdateTimeOpen: {
      default: () => false,
      type: Boolean
    },
    item: {
      default: () => ({}),
      type: Object
    }
  },
  data: () => ({
    id: null,
    timeStartAt: null,
    timeEndAt: null,
    menuStartAt: false,
    menuEndAt: false
  }),
  methods: {
    ...mapActions("defaultTimeslots", ["updateDefaultTimeslot"]),
    close() {
      //      this.timeStartAt = null;
      //      this.timeEndAt = null;
      this.$emit("dialogUpdateTimeClose");
    },
    updateSlotTime(timeslot) {
      if (this.timeStartAt === null || this.timeEndAt === null) {
        return;
      }

      if (this.timeStartAt < this.timeEndAt) {
        this.updateDefaultTimeslot(timeslot);
        this.close();
      }
    }
  },
  watch: {
    item: function({ id, start_at, end_at }) {
      this.id = id;
      this.timeStartAt = start_at.slice(0, 5);
      this.timeEndAt = end_at.slice(0, 5);
    }
  }
};
</script>
