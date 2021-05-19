<template>
  <v-dialog v-model="isOrderDialogShow" max-width="500px" persistent>
    <v-card>
      <v-toolbar dark tile color="#9fc51c">
        <template>
          <v-btn elevation="0" class="grey darken-3 py-1 px-3 rounded"
            >dsdfssf</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn x-small fab color="grey darken-3" dark @click="closeDialog">
            <v-icon x-small>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Time" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Email" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Name" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Phone" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="Shipping address" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#9fc51c">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { tConvert } from "@/helpers/helpers.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "OrderConfirmation",
  data: () => ({}),
  computed: {
    ...mapGetters("booking", ["isOrderDialogShow"])
  },
  methods: {
    ...mapActions("booking", ["closeOrderDialog"]),
    closeDialog() {
      this.closeOrderDialog();
    },
    convertTime(time) {
      return tConvert(time);
    }
  }
};
</script>
