<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-card
        v-for="(timeslot, dIndex) in timeslots"
        :key="dIndex"
        class="my-3 mx-3"
        style="min-width: 200px;"
      >
        <v-card-title>{{ dIndex }}</v-card-title>
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
                    {{ item.end_at }}</v-list-item-subtitle
                  >
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
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Timeslots",
  data: () => ({}),
  computed: {
    ...mapGetters("defaultTimeslots", ["timeslots"])
  }
};
</script>