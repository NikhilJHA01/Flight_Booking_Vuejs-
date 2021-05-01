import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

describe("Header.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "Flight Booking";
    const wrapper = shallowMount(Header);
    expect(wrapper.text()).toMatch(msg);
  });
});
