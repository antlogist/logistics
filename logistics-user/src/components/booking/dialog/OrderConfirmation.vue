<template>
  <v-dialog v-model="isOrderDialogShow" max-width="500px" persistent>
    <v-card>
      <v-toolbar dark tile color="#9fc51c">
        <template>
          <v-btn elevation="0" class="grey darken-3 py-1 px-3 rounded"
            >{{ currentDate }} {{ convertTime(start_at) }}-{{
              convertTime(end_at)
            }}</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn x-small fab color="grey darken-3" dark @click="closeDialog">
            <v-icon x-small>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-toolbar>

      <v-form ref="form" v-model="valid">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Email"
                  v-model="formEmail"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Phone"
                  required
                  v-model="formPhone"
                  :rules="phoneRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="Name"
                  v-model="formName"
                  :counter="30"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="Shipping address"
                  :counter="100"
                  :rules="addressRules"
                  v-model="formAddress"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="order" color="#9fc51c" class="mb-5 mr-3">
            Submit
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { tConvert } from "@/helpers/helpers.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "OrderConfirmation",
  data: () => ({
    valid: false,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Name must be less than 30 characters"
    ],
    addressRules: [
      v => !!v || "Address is required",
      v => (v && v.length <= 100) || "Address must be less than 100 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    phoneRules: [
      v => !!v || "Phone number is required",
      v => /^(?=.*[0-9])[- +()0-9]+$/.test(v) || "Phone number must be valid"
    ]
  }),
  computed: {
    ...mapGetters("booking", [
      "isOrderDialogShow",
      "currentDate",
      "start_at",
      "end_at",
      "email",
      "phone",
      "address",
      "name"
    ]),
    formName: {
      get() {
        return this.name;
      },
      set(val) {
        this.setName(val);
      }
    },
    formEmail: {
      get() {
        return this.email;
      },
      set(val) {
        this.setEmail(val);
      }
    },
    formPhone: {
      get() {
        return this.phone;
      },
      set(val) {
        this.setPhone(val);
      }
    },
    formAddress: {
      get() {
        return this.address;
      },
      set(val) {
        this.setAddress(val);
      }
    }
  },
  methods: {
    ...mapActions("booking", [
      "closeOrderDialog",
      "setName",
      "setEmail",
      "setPhone",
      "setAddress",
      "placeOrder"
    ]),
    validate() {
      this.$refs.form.validate();
    },
    closeDialog() {
      this.closeOrderDialog();
    },
    convertTime(time) {
      return tConvert(time);
    },
    order() {
      this.validate();
      if (this.valid === true) {
        this.placeOrder();
      }
    }
  }
};
</script>
