<template>
  <transition name="ar-fade">
  <div class="ar-popup" v-if="show">
    <overlay :show="show" @click="handleHidden" />
    <div class="ar-popup-main">
      <slot />
    </div>
  </div>
  </transition>
</template>

<script>
import Overlay from '../Overlay/index.vue';

export default {
  name: 'ArPopup',
  components: {
    Overlay,
  },
  props: {
    value: Boolean,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleHidden(e) {
      this.$emit('input', false);
      this.$emit('click', e);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
  },
};
</script>
