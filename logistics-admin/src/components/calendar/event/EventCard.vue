<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-toolbar color="#9fc51c" light>
        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon small class="mr-1">
          <v-icon small @click="closeEvent">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list two-line>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#9fc51c">
              mdi-folder
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ selectedEvent.orderId }}</v-list-item-title>
            <v-list-item-subtitle>Order ID</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#9fc51c">
              mdi-cash-multiple
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{
              selectedEvent.paymentStatus
            }}</v-list-item-title>
            <v-list-item-subtitle>Payment status</v-list-item-subtitle>
          </v-list-item-content>

          <v-btn
            elevation="2"
            x-small
            icon
            v-if="selectedEvent.paymentStatus === 'Paid'"
          >
            <v-icon color="#9fc51c">mdi-check</v-icon>
          </v-btn>

          <v-btn
            elevation="2"
            icon
            x-small
            v-else
            @click="getStatus(selectedEvent.orderToken)"
          >
            <v-icon>mdi-update</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#9fc51c">
              mdi-clock
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ selectedEvent.timeslot }}</v-list-item-title>
            <v-list-item-subtitle>Timeslot</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#9fc51c">
              mdi-check-circle
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ selectedEvent.status }}</v-list-item-title>
            <v-list-item-subtitle>Status</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#9fc51c">
              mdi-phone
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ selectedEvent.phone }}</v-list-item-title>
            <v-list-item-subtitle>Phone</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#9fc51c">
              mdi-email
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ selectedEvent.email }}</v-list-item-title>
            <v-list-item-subtitle>Email</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#9fc51c">
              mdi-map-marker
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            {{ selectedEvent.address }}
            <v-list-item-subtitle>Address</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    selectedEvent: {
      default: () => ({}),
      type: Object
    }
  },
  data: () => ({}),
  methods: {
    closeEvent() {
      this.$emit("closeEvent");
    },
    getStatus(token) {
      this.$emit("getStatus", token);
    }
  }
};
</script>
