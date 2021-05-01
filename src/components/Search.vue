<template>
  <el-form
    :inline="true"
    :rules="rules"
    ref="flightSearchForm"
    :model="flightSearchForm"
    class="demo-form-inline flightSearchForm"
  >
    <el-row>
      <el-form-item>
        <el-radio-group
          v-model="flightSearchForm.typeOfJourney"
          @change="handleChange"
          size="small"
        >
          <el-radio-button label="One Way"></el-radio-button>
          <el-radio-button label="Round Trip"></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <section class="flightSearchForm__inputs">
      <section class="flightSearchForm__inputs--travelCities">
        <el-form-item prop="departureCity">
          <el-select
            v-model="flightSearchForm.departureCity"
            filterable
            clearable
            reserve-keyword
            placeholder="From"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="arrivalCity">
          <el-select
            v-model="flightSearchForm.arrivalCity"
            filterable
            clearable
            reserve-keyword
            placeholder="To"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flightSearchForm__inputs--travelDates">
        <el-form-item prop="departureDate">
          <el-date-picker
            v-model="flightSearchForm.departureDate"
            :picker-options="quickPicker"
            type="date"
            placeholder="Select Departure date"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="returnDate">
          <el-date-picker
            v-model="flightSearchForm.returnDate"
            :picker-options="quickPicker"
            :disabled="isOneWayJourney"
            type="date"
            placeholder="Select Return Date"
          >
          </el-date-picker>
        </el-form-item>
      </section>
      <section class="flightSearchForm__inputs--button">
        <el-form-item>
          <el-input-number
            v-model="flightSearchForm.ticketCount"
            :min="1"
            :max="5"
            size="medium"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('flightSearchForm')"
            >Apply Search</el-button
          >
        </el-form-item>
      </section>
    </section>
  </el-form>
</template>
<script>
import moment from "moment";
import EventBus from "../utility/eventBus.js";
import { MomentService } from "../utility/momentUtil";

export default {
  data() {
    // Validators for Search Inputs
    const originValidator = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Select Origin"));
      } else if (value === this.flightSearchForm.arrivalCity) {
        callback(new Error("Origin and Destination can't be same"));
      } else {
        callback();
      }
    };
    const destinationValidator = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Select Destination"));
      } else {
        callback();
      }
    };
    const returnDateValidator = (rule, value, callback) => {
      if (value === "" && !this.isOneWayJourney) {
        callback(new Error("Select Return journey"));
      } else {
        callback();
      }
    };
    return {
      flightSearchForm: {
        departureCity: "",
        arrivalCity: "",
        departureDate: "",
        returnDate: "",
        typeOfJourney: "One Way",
        ticketCount: 1
      },
      timer: null,

      // Rule set applied on Input Validators
      rules: {
        departureCity: [
          {
            validator: originValidator,
            trigger: "change"
          }
        ],
        arrivalCity: [
          {
            validator: destinationValidator,
            trigger: "change"
          }
        ],
        departureDate: [
          {
            required: true,
            message: "Select Departure Date",
            trigger: "change"
          }
        ],
        returnDate: [
          {
            validator: returnDateValidator,
            trigger: "change"
          }
        ]
      },
      loading: false,
      options: [],

      // Disable Dates in Date-picker before Current  Date
      quickPicker: {
        disabledDate(date) {
          return date < MomentService.subtractDays(1);
        }
      }
    };
  },
  computed: {
    // Check the Type Of Journey
    isOneWayJourney() {
      return this.flightSearchForm.typeOfJourney
        .toLowerCase()
        .includes("one way")
        ? true
        : false;
    },
    // Fetch the city from store so that it can be dynamic if chnages in Requirement
    cityList() {
      return this.$store && this.$store.state.cityList
        ? this.$store.state.cityList
        : [];
    }
  },
  mounted() {
    this.mapCityListToList();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // Debouncing on click of search button
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(() => {
            this.dispatchIfValidForm();
          }, 200);
        } else {
          return false;
        }
      });
    },
    dispatchIfValidForm() {
      this.formatDate();
      this.$store.dispatch("getOneWayFlights", this.flightSearchForm);

      this.$store.dispatch("getReturnFlights", this.flightSearchForm);

      EventBus.$emit("onSubmitForm", this.flightSearchForm);
      // this.flightSearchForm.clearValidate(this.flightSearchForm.departureCity);
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.dropDownList.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = this.dropDownList;
      }
    },
    formatDate() {
      if (this.flightSearchForm.departureDate)
        this.flightSearchForm.departureDate = MomentService.defaultDateFormat(
          this.flightSearchForm.departureDate
        );
      if (this.flightSearchForm.returnDate)
        this.flightSearchForm.returnDate = MomentService.defaultDateFormat(
          this.flightSearchForm.returnDate
        );
    },
    handleChange() {
      EventBus.$emit("isReturnJourney", !this.isOneWayJourney);
    },
    mapCityListToList() {
      this.dropDownList = this.cityList.map(item => {
        return { value: item, label: item };
      });
      this.options = this.dropDownList;
    }
  }
};
</script>

<style lang="scss" scoped>
.flightSearchForm {
  padding: 10px;
  &__inputs {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px;

    .el-form-item {
      margin-bottom: 20px;
      .el-input-number--medium {
        width: 100px;
      }
    }
    &--travelCities,
    &--travelDates,
    &--button {
      display: flex;
    }
    &--travelDates {
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: auto;
      }
    }

    @include tablet() {
      &--travelDates,
      &--travelCities,
      &--button {
        display: flex;
        flex-direction: column;
      }
    }
    @include phone() {
      flex-direction: column;
      .el-input__inner {
        font-size: 12px;
      }
    }
  }
  // TODO
  .el-form-item__error {
    font-size: 10px;
    font-weight: 600;
  }
}
</style>
