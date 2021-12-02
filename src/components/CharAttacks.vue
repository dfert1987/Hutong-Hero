<template>
  <transition
  name="attack"
  enter-active-class="appear"
  leave-active-class="smack">

  </transition>
</template>

<script>
export default {
  props: {
    character: Object,
    moveOne: Object,
  },
};
</script>
