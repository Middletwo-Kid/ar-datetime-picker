<template>
  <transition name="ar-fade">
    <div class="ar-overlay"
         v-show="show"
         @click.self="handleClose">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ArOverlay',
  props: {
    show: Boolean,
  },
  methods: {
    handleClose(e) {
      this.$emit('click', e);
    },
  },
};
</script>
