import { shallowMount } from "@vue/test-utils";
import Search from "@/components/Search";

describe("Search.vue", () => {
  const wrapper = shallowMount(Search);

  it("has a form", () => {
    const form = wrapper.find("el-form");
    expect(form.exists()).toBe(true);
  });
  it("has a button", () => {
    const button = wrapper.find("el-button");
    expect(button.exists()).toBe(true);
  });

  it("Ticket is zero by default", () => {
    expect(wrapper.vm.flightSearchForm.ticketCount).toBe(1);
  });

  it("One Way Journey By Default", () => {
    expect(wrapper.vm.flightSearchForm.typeOfJourney).toBe("One Way");
  });

});
