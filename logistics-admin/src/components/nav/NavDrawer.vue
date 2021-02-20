<template>
  <v-navigation-drawer
    v-model="drawerVal"
    temporary
    app
    @click:outside="toggleDrawer(false)"
  >
    <v-list-item>
      <v-list-item-content>
        <img
          style="max-width: 110px; margin: 0 auto;"
          src="https://wildgarliccatering.com/images/logo-colour.png"
          alt=""
        />
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item-group v-model="group">
        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <nav-item :item="item"></nav-item>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavItem from "@/components/nav/NavItem";
export default {
  name: "NavDrawer",
  data: () => ({
    navItems: [
      {
        title: "Calendar",
        component: "Calendar",
        link: "calendar",
        icon: "mdi-calendar"
      },
      {
        title: "Bookings",
        component: "Bookings",
        link: "bookings",
        icon: "mdi-view-list"
      },
      {
        title: "Report",
        component: "Report",
        link: "report",
        icon: "mdi-book-open-page-variant"
      },
      {
        title: "Map",
        component: "Map",
        link: "map",
        icon: "mdi-map-marker"
      }
    ],
    group: null
  }),
  computed: {
    ...mapGetters(["drawer"]),
    drawerVal: {
      get() {
        return this.drawer;
      },
      set(bool) {
        this.toggleDrawer(bool);
      }
    }
  },
  methods: {
    ...mapActions(["toggleDrawer"])
  },
  components: {
    NavItem
  },
  watch: {
    group() {
      this.toggleDrawer(false);
    }
  }
};
</script>
