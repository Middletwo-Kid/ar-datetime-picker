<template>
  <div class="ar-datatime-picker-footer">
      <div class="unlimited" @click.stop="handleUnlimited">不限</div>
      <div class="comfirm" @click.stop="handleComfirm">确定</div>
  </div>
</template>

<script>
export default {
  name: 'ArDatatimePickerFooter',
  methods: {
    handleUnlimited() {
      this.$emit('unlimit');
    },
    handleComfirm() {
      this.$emit('comfirm');
    },
  },
};
</script>

<style lang="scss" scoped>
.ar-datatime-picker-footer{
  height: 44px;
  display: flex;
  align-items: center;
  border-top: 1px solid #F2F4F7;
  border-bottom: 1px solid #F2F4F7;

  > .unlimited, .comfirm {
    flex: 0 0 50%;
    font-size: 14px;
    line-height: 44px;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
  }

  >.unlimited{
    color: $ar-main;
    border-left: 1px solid #F2F4F7;
    &:active{
      background-color: rgba(242, 244, 247, 0.6);
    }
  }

  >.comfirm{
    color: #fff;
    background: $ar-primary;
  }
}
</style>
