<template>
  <div class="ar-action-sheet" v-if="show">
    <div class="ar-action-sheet-mask" @click.self="handleHidden" />
    <div class="ar-action-sheet-main">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArActionSheet',
  props: {
    value: Boolean,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleHidden() {
      this.$emit('input', false);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.ar-action-sheet{
  position: absolute;
  top:0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 100;

  &-mask{
    position: absolute;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.8);
  }

  &-main{
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding-top: 16px;
    z-index: 200;
    border-radius: 20px 20px 0 0;
    background: #fff;
  }
}
</style>
