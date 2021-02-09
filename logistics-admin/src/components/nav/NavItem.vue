<template>
  <v-list-item-title>{{ item.title }}</v-list-item-title>
</template>

<script>
export default {
  name: "NavItem",
  props: {
    item: {
      default: () => ({ title: "Nav Title", component: "Component" }),
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped="true"></style>
