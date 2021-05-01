<template>
  <div class="home">
    <!-- Search Form for Flights -->
    <Search />
    <!-- Display section Of Flight results -->
    <FlightResults />
  </div>
</template>

<script>
// @ is an alias to /src
import Search from "@/components/Search.vue";
import FlightResults from "@/components/FlightResults";

export default {
  name: "Home",
  components: {
    Search,
    FlightResults
  }
};
</script>
