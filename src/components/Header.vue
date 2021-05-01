<template>
  <div class="header">
    <h1 class="header__title">Flight Booking</h1>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0 1rem;
  color: white;
  @include phone() {
    justify-content: center;
    padding: 0 0.5rem;
    &__title {
      font-size: 1.5rem;
    }
  }
}
</style>
