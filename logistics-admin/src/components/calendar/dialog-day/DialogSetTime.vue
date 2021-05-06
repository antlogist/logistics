<template>
  <v-dialog v-model="dialogSetTimeOpen" max-width="500px">
    <v-card>
      <v-toolbar dark tile color="#9fc51c">
        <template>
          <v-btn
            elevation="9"
            class="grey darken-3 py-1 px-3 rounded"
            @click="setSlotTime"
            >Set Time</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            x-small
            fab
            color="grey darken-3"
            dark
            @click="dialogSetTimeClose"
          >
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
export default {
  name: "DialogSetTime",
  props: {
    dialogSetTimeOpen: {
      default: () => false,
      type: Boolean
    }
  },
  data: () => ({
    dialogSetTimeShow: false,
    timeStartAt: null,
    timeEndAt: null,
    menuStartAt: false,
    menuEndAt: false
  }),
  methods: {
    dialogSetTimeClose() {
      this.timeStartAt = null;
      this.timeEndAt = null;
      this.$emit("dialogSetTimeClose");
    },
    setSlotTime() {
      this.dialogSetTimeClose();
    }
  }
};
</script>
