<template>
  <v-container>
    <h1 class="text-center my-3 text-uppercase">Default Time Slots</h1>

    <v-row>
      <v-col cols="4" offset="3">
        <v-card style="min-height: 200px;">
          <v-card-actions>
            <v-switch
              v-model="slotsMode"
              color="red darken-3"
              label="Closable Timeslots"
            ></v-switch>
          </v-card-actions>

          <v-card-text>
            <p class="font-weight-light font-italic">
              When using <b>closed time slots</b> that when used by one customer
              it will become unavailable to use by other customers
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="2">
        <v-card style="min-height: 200px;">
          <v-card-actions>
            <v-text-field
              v-model="maxBookings"
              type="number"
              label="Max bookings"
              style="max-width: 100px;"
              min="0"
              max="100"
            ></v-text-field>
          </v-card-actions>

          <v-card-text>
            <p class="font-weight-light font-italic">
              Max bookings per time slot.<br />
              0 - infinity bookings
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center my-5">
      <v-card
        v-for="(timeslot, dIndex) in 7"
        :key="dIndex"
        class="my-3 mx-3"
        style="min-width: 250px; min-height: 300px;"
      >
        <v-card-title class="mb-2" center>{{
          weekdayNames[dIndex]
        }}</v-card-title>

        <!--Buttons-->
        <v-card-text>
          <v-row class="justify-center">
            <v-btn-toggle rounded>
              <v-btn small @click="openDialogSetTime(dIndex)">
                <v-icon small>mdi-plus</v-icon>
              </v-btn>
              <v-btn small>
                <v-icon small>mdi-message</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-row>
        </v-card-text>

        <v-card-text>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(item, tIndex) in timeslots[dIndex]"
                :key="tIndex"
              >
                <v-list-item-content>
                  <v-list-item-subtitle
                    >{{ item.start_at }} -
                    {{ item.end_at }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <div class="d-flex">
                  <v-btn icon x-small class="mx-1" @click="editItem(item)">
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
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </v-row>

    <DialogUpdateDefaultTime
      :item="currentItem"
      :dialogUpdateTimeOpen="dialogUpdateTimeShow"
      @dialogUpdateTimeClose="dialogUpdateTimeClose"
    ></DialogUpdateDefaultTime>

    <DialogSetDefaultTime
      :dialogSetTimeOpen="dialogSetTimeShow"
      @dialogSetTimeClose="dialogSetTimeClose"
    ></DialogSetDefaultTime>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DialogSetDefaultTime from "@/components/timeslots/dialog/DialogSetDefaultTime";
import DialogUpdateDefaultTime from "@/components/timeslots/dialog/DialogUpdateDefaultTime";
export default {
  name: "Timeslots",
  data: () => ({
    dialogSetTimeShow: false,
    dialogUpdateTimeShow: false,
    currentItem: {},
    weekdayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  }),
  computed: {
    ...mapGetters("defaultTimeslots", ["timeslots"]),
    ...mapGetters("settings", ["settings"]),
    slotsMode: {
      get() {
        if (this.settings["timeslots_mode"] === "none_closable") {
          return false;
        } else {
          return true;
        }
      },
      set(mode) {
        if (mode === false) {
          this.updateSettings({
            name: "timeslots_mode",
            value: "none_closable"
          });
        } else {
          this.updateSettings({ name: "timeslots_mode", value: "closable" });
        }
      }
    },
    maxBookings: {
      get() {
        return this.settings["max_bookings"];
      },
      set(bookings) {
        this.updateSettings({ name: "max_bookings", value: bookings });
      }
    }
  },
  methods: {
    ...mapActions("defaultTimeslots", [
      "setCurrentWeekday",
      "fetchTimeslots",
      "deleteTimeslot"
    ]),
    ...mapActions("settings", ["updateSettings"]),
    openDialogSetTime(index) {
      this.setCurrentWeekday(index);
      this.dialogSetTimeShow = true;
    },
    dialogSetTimeClose() {
      this.dialogSetTimeShow = false;
    },
    dialogUpdateTimeClose() {
      this.dialogUpdateTimeShow = false;
    },
    editItem(item) {
      this.currentItem = item;
      this.dialogUpdateTimeShow = true;
      console.log(item);
    },
    deleteItem(id) {
      console.log(id);
      this.deleteTimeslot(id);
    }
  },
  mounted() {
    this.fetchTimeslots();
  },
  components: {
    DialogSetDefaultTime,
    DialogUpdateDefaultTime
  }
};
</script>
