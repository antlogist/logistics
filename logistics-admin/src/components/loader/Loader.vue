<template>
  <div class="loader-wrap" v-if="isShowLoader">
    <v-container style="height: 100%;">
      <v-row class="fill-height" align-content="center" justify="center">
        <v-col class="subtitle-1 text-center" cols="12">
          Loading...
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="#9fc51c"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Loader",
  computed: {
    ...mapGetters(["isShowLoader"])
  }
};
</script>

<style scoped="true" lang="scss">
.loader-wrap {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
}
</style>
