import Vue from "vue";

Vue.filter("removeCityCode", string => (string ? string.slice(0, -6) : ""));
