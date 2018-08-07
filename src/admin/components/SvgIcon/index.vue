<template>
  <i :class="[className, 'fas', `fa-${computeClass}`]"/>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ""
    }
  },
  computed: {
    computeClass() {
      return this.iconClass.replace(/[A-Z]/g, i => {
        return "-" + i.toLowerCase();
      });
    }
  }
};
</script>
