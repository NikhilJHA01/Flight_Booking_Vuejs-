<template>
  <section class="layoverFlightCard">
    <el-card class="card" shadow="always">
      <!-- Display Overview of Layover Journey -->
      <div class="card__body">
        <div class="flex-column">
          <svg class="icon icon-aircraft-take-off">
            <use xlink:href="/sprite.svg#icon-aircraft-take-off"></use>
          </svg>
        </div>
        <div class="flex-column">
          <span class="primary--text">Multiple</span
          ><span class="showDetailsLink" @click="toggleDetails()">{{
            showDetails ? "Hide Details" : "Show Details"
          }}</span>
        </div>
        <div class="flex-column">
          <span class="primary--text">{{
            layOverFlights[0].departureTime
          }}</span
          ><span class="secondary--text">{{
            layOverFlights[0].origin | removeCityCode
          }}</span>
        </div>
        <div class="flex-column">
          <span class="primary--text">{{ layOverFlights[1].arrivalTime }}</span
          ><span class="secondary--text">{{
            layOverFlights[1].destination | removeCityCode
          }}</span>
        </div>
        <div class="flex-column">
          <span class="primary--text">{{ totalHoursOfJourney }}</span
          ><span class="secondary--text">Total Duration</span>
        </div>
        <div class="flex-column">
          <span class="primary--text red-color">
            &#x20b9;{{ totalPriceOfTickets }}</span
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

      <!-- Display Multiple flights when clicked on show details -->
      <div v-if="showDetails" class="layoverFlightCard__details">
        <el-card
          class="card layoverFlightCard__layoutCard"
          v-for="flight in layOverFlights"
          :key="flight.flightNo"
        >
          <div class="card__body ">
            <div class="flex-column">
              <svg class="icon icon-aircraft-take-off">
                <use xlink:href="/sprite.svg#icon-aircraft-take-off"></use>
              </svg>
            </div>
            <div class="flex-column">
              <span class="primary--text">{{ flight.name }}</span
              ><span class="secondary--text">{{ flight.flightNo }}</span>
            </div>
            <div class="flex-column">
              <span class="primary--text">{{ flight.departureTime }}</span
              ><span class="secondary--text">{{
                flight.origin | removeCityCode
              }}</span>
            </div>
            <div class="flex-column">
              <span class="primary--text">{{ flight.arrivalTime }}</span
              ><span class="secondary--text">{{
                flight.destination | removeCityCode
              }}</span>
            </div>
            <div class="flex-column">
              <span class="primary--text">{{ flight.totalHours }}</span
              ><span class="secondary--text">Non Stop</span>
            </div>
          </div>
        </el-card>
        <div class="layoverFlightCard--layoverTime">
          Layover Time {{ layOverTime }}
        </div>
      </div>
    </el-card>
  </section>
</template>

<script>
import moment from "moment";
import { MomentService } from "../../utility/momentUtil";

export default {
  name: "LayoverFlightCard",
  data() {
    return {
      showDetails: false
    };
  },
  props: {
    layOverFlights: {
      type: Array,
      required: true
    },
    ticketCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    // Calculate time between first flights arrival and second's departure
    layOverTime() {
      return MomentService.convertHoursFormat(
        this.layOverFlights[0].arrivalTime,
        this.layOverFlights[1].departureTime
      );
    },

    // Calculate time from start of journey to End when taking multiple flights
    totalHoursOfJourney() {
      return MomentService.convertHoursFormat(
        this.layOverFlights[0].departureTime,
        this.layOverFlights[1].arrivalTime
      );
    },

    // Calculate Sum of prices of multiple flights taken in journey * total travellers
    totalPriceOfTickets() {
      return (
        this.layOverFlights.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price;
        }, 0) * this.ticketCount
      );
    }
  },
  methods: {
    // Emit event to Parent To Open the Booking dialog Message
    bookingSuccess() {
      this.$emit("showBookingMessage");
    },
    // Toggle Show Details and Hide details
    toggleDetails() {
      this.showDetails = !this.showDetails;
    }
  }
};
</script>

<style lang="scss" scoped>
.layoverFlightCard {
  .icon {
    @extend %default-icon;
    fill: $primary-main;
  }
  .card {
    margin: 10px;
    &__body {
      @extend %default-card-body;
      margin-bottom: 10px;
    }
  }
  &__layoutCard {
    margin-bottom: 2px;
    background-color: #ebeef5;
    box-shadow: none;
  }
  &--layoverTime {
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    padding: 8px;
    border-radius: 5px;
    color: #606266;
    font-size: 13px;
    background-color: white;
  }
  &__details {
    position: relative;
  }
  .showDetailsLink {
    cursor: pointer;
    color: $primary-main;
    font-size: 12px;
    padding: 2px;
    @include phone() {
      font-size: 9px;
    }
  }
}
</style>
