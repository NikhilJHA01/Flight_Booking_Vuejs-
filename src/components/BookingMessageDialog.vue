<template>
  <el-dialog
    class="bookingDialog"
    title="Booking Successful"
    :visible.sync="centerDialogVisible"
    width="30%"
    center
    @close="closeDialog"
  >
    <div class="dialog__body">
      <el-button
        type="success"
        icon="el-icon-check"
        size="medium"
        circle
        @click="closeDialog"
      ></el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: true
    };
  },
  created() {
    // Open Dialog as soon as component is created
    this.centerDialogVisible = true;
  },
  methods: {
    // Emit Event on Close od Dialog to Parent
    closeDialog() {
      this.$emit("closeDialog");
    }
  }
};
</script>

<style lang="scss" scoped>
.bookingDialog {
  .dialog__body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
