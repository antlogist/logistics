<template>
  <v-dialog v-model="isDayDialogShow" max-width="500px" persistent>
    <v-card>
      <DialogToolbar></DialogToolbar>
      <v-container>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel unde culpa
        dolorum ut dolores veritatis molestias. Saepe deserunt sequi
        reprehenderit fugiat. Distinctio quas, saepe asperiores dolor molestias
        nulla laudantium. Sit!
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import DialogToolbar from "@/components/booking/dialog/DialogToolbar";
export default {
  name: "Dialog",
  data: () => ({}),
  computed: {
    ...mapGetters("booking", ["isDayDialogShow"])
  },
  methods: {},
  components: {
    DialogToolbar
  }
};
</script>
