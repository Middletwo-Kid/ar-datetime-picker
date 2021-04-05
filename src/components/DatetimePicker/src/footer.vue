<template>
  <div class="ar-datetime-picker-footer">
      <div class="cancel" @click.stop="handleCancel">取消</div>
      <div class="unlimited" @click.stop="handleUnlimited">不限</div>
      <div class="comfirm" @click.stop="handleComfirm">确定</div>
  </div>
</template>

<script>
export default {
  name: 'ArDatetimePickerFooter',
  methods: {
    handleCancel() {
      this.$emit('cancel');
    },
    handleUnlimited() {
      this.$emit('unlimit');
    },
    handleComfirm() {
      this.$emit('comfirm');
    },
  },
};
</script>
