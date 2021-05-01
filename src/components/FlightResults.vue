<template>
  <el-row class="flightResults">
    <!-- Section One-Way Journey Starts -->
    <el-col class="section__oneWay">
      <el-card class="card" shadow="always" v-if="formData">
        <div class="card__body heading">
          <div class="flex-column">
            <svg class="icon icon-aircraft">
              <use xlink:href="/sprite.svg#icon-aircraft"></use>
            </svg>
          </div>
          <div class="flex-column">
            <span class="section__oneWay--heading"
              >{{ formData.departureCity.toUpperCase() }} &#x21d2;
              {{ formData.arrivalCity.toUpperCase() }}</span
            >
            <span class="section__oneWay--heading"
              >{{ totalOneWayFlights }} Flights &#x21d2;{{ formatDate }}</span
            >
          </div>
        </div>
      </el-card>

      <!-- Display One-way-journey Non-stop flights -->
      <NonStopFlightCard
        :nonStopFlight="flight"
        @showBookingMessage="showMessage()"
        :ticketCount="formData ? formData.ticketCount : 1"
        v-for="flight in flightListOneWay"
        :key="flight.flightNo"
      />
      <!-- Display One-way-journey Layover flights -->
      <LayoverFlightCard
        :layOverFlights="flight"
        @showBookingMessage="showMessage()"
        :ticketCount="formData ? formData.ticketCount : 1"
        v-for="(flight, index) in flightListMultiple"
        :key="index"
      />
    </el-col>
    <!-- Section One-Way Journey Ends -->

    <!-- Section Return Journey Starts -->
    <el-col v-if="isReturnJourney && formData" class="section__returnJourney">
      <el-card class="card" shadow="always">
        <div class="card__body heading">
          <div class="flex-column">
            <svg class="icon icon-aircraft">
              <use xlink:href="/sprite.svg#icon-aircraft"></use>
            </svg>
          </div>
          <div class="flex-column">
            <span class="section__returnJourney--heading"
              >{{ formData.arrivalCity.toUpperCase() }} &#x21d2;
              {{ formData.departureCity.toUpperCase() }}
            </span>
            <span class="section__returnJourney--heading" v-if="returnDate"
              >{{ totalReturnFlights }} Flights &#x21d2; {{ returnDate }}</span
            >
            <span class="section__returnJourney--heading errorClass" v-else
              >Select Return Date</span
            >
          </div>
        </div>
      </el-card>

      <!-- Display Return-journey Non-stop flights -->
      <NonStopFlightCard
        :nonStopFlight="flight"
        @showBookingMessage="showMessage()"
        :ticketCount="formData ? formData.ticketCount : 1"
        v-for="flight in returnFlightListOneWay"
        :key="flight.flightNo"
      />

      <!-- Display Return-journeyLayover flights -->
      <LayoverFlightCard
        :layOverFlights="flight"
        @showBookingMessage="showMessage()"
        :ticketCount="formData ? formData.ticketCount : 1"
        v-for="(flight, index) in returnFlightListMultiple"
        :key="index"
      />
    </el-col>
    <!-- Section Return Journey Ends -->

    <BookingMessageDialog
      @closeDialog="closeDialog"
      v-if="showBookingMessage"
    />
  </el-row>
</template>

<script>
import NonStopFlightCard from "./Cards/NonStopFlightCard";
import LayoverFlightCard from "./Cards/LayoverFlightCard";
import BookingMessageDialog from "./BookingMessageDialog";
import EventBus from "../utility/eventBus.js";
import { MomentService } from "../utility/momentUtil";

export default {
  data() {
    return {
      isReturnJourney: false,
      showBookingMessage: false,
      formData: null
    };
  },
  components: { NonStopFlightCard, LayoverFlightCard, BookingMessageDialog },

  mounted() {
    // Fetch Json response from the Flights.json
    this.fetchFlightsData();
  },

  // All initialisations to be done after creating component
  created() {
    this.attachEventListeners();
  },

  // Remove All Event Listeners Before Destroying Component
  beforeDestroyed() {
    this.removeEventListeners();
  },
  computed: {
    flightListOneWay() {
      return this.$store.state.flightsOneWay
        ? this.$store.state.flightsOneWay.filter(
            flight => !Array.isArray(flight)
          )
        : [];
    },
    flightListMultiple() {
      return this.$store.state.flightsOneWay
        ? this.$store.state.flightsOneWay.filter(flight =>
            Array.isArray(flight)
          )
        : [];
    },
    returnFlightListOneWay() {
      return this.$store.state.returnFlights
        ? this.$store.state.returnFlights.filter(
            flight => !Array.isArray(flight)
          )
        : [];
    },
    returnFlightListMultiple() {
      return this.$store.state.returnFlights
        ? this.$store.state.returnFlights.filter(flight =>
            Array.isArray(flight)
          )
        : [];
    },
    totalOneWayFlights() {
      return this.$store.state.flightsOneWay
        ? this.$store.state.flightsOneWay.length
        : 0;
    },
    totalReturnFlights() {
      return this.$store.state.returnFlights
        ? this.$store.state.returnFlights.length
        : 0;
    },
    formatDate() {
      if (this.formData)
        return MomentService.formatDate(this.formData.departureDate);
    },
    returnDate() {
      if (this.formData && this.formData.returnDate)
        return MomentService.formatDate(this.formData.returnDate);
    }
  },
  methods: {
    attachEventListeners() {
      EventBus.$on("isReturnJourney", data => {
        this.isReturnJourney = data;
      });
      EventBus.$on("onSubmitForm", data => {
        this.formData = { ...data };
      });
    },
    removeEventListeners() {
      EventBus.$off("isReturnJourney");
      EventBus.$off("onSubmitForm");
    },
    fetchFlightsData() {
      this.$store.dispatch("getFlights");
    },
    closeDialog() {
      this.showBookingMessage = false;
    },
    showMessage() {
      this.showBookingMessage = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.flightResults {
  display: flex;
  .results__list {
    display: flex;
    padding-left: 10px;
    margin: 10px;
  }
  .icon {
    @extend %default-icon;
    fill: $primary-main;
  }
  .section__oneWay,
  .section__returnJourney {
    .heading {
      justify-content: flex-start;
    }
    &--heading {
      padding: 5px;
      margin-left: 10px;
    }
    .errorClass {
      color: $red;
    }
  }

  .card {
    margin: 10px;
    &__body {
      @extend %default-card-body;
    }
  }

  @include tablet() {
    flex-direction: column;
  }
  @include phone() {
    flex-direction: column;
  }
}
</style>
