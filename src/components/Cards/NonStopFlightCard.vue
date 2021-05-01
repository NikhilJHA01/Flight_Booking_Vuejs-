<template>
  <section class="nonStopFlights">
    <el-card class="card" shadow="always">
      <div class="card__body">
        <div class="flex-column">
          <svg class="icon icon-aircraft-take-off">
            <use xlink:href="/sprite.svg#icon-aircraft-take-off"></use>
          </svg>
        </div>
        <div class="flex-column">
          <span class="primary--text">{{ nonStopFlight.name }}</span
          ><span class="secondary--text">{{ nonStopFlight.flightNo }}</span>
        </div>
        <div class="flex-column">
          <span class="primary--text">{{ nonStopFlight.departureTime }}</span
          ><span class="secondary--text">{{
            nonStopFlight.origin | removeCityCode
          }}</span>
        </div>
        <div class="flex-column">
          <span class="primary--text">{{ nonStopFlight.arrivalTime }}</span
          ><span class="secondary--text">{{
            nonStopFlight.destination | removeCityCode
          }}</span>
        </div>
        <div class="flex-column">
          <span class="primary--text">{{ nonStopFlight.totalHours }}</span
          ><span class="secondary--text">Non Stop</span>
        </div>
        <div class="flex-column">
          <span class="primary--text red-color">
            &#x20b9;{{ nonStopFlight.price * ticketCount }}</span
          >
          <span class="secondary--text">{{ ticketCount }} Ticket</span>
        </div>
        <el-button
          type="success"
          @click="bookingSuccess()"
          class="defaultBookButton"
          >Book</el-button
        >
      </div>
    </el-card>
  </section>
</template>

<script>
export default {
  name: "NonStopFlightCard",
  data() {
    return {};
  },
  props: {
    nonStopFlight: {
      type: Object,
      required: true
    },
    ticketCount: {
      type: Number,
      required: true
    }
  },
  components: {},
  methods: {
    // Emit event to Parent To Open the Booking dialog Message
    bookingSuccess() {
      this.$emit("showBookingMessage");
    }
  }
};
</script>

<style lang="scss" scoped>
.nonStopFlights {
  .card {
    margin: 10px;
    .icon {
      @extend %default-icon;
      stroke: $primary-main;
      fill: white;
    }
    &__body {
      @extend %default-card-body;
    }
  }
}
</style>
