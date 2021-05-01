import { mount } from "@vue/test-utils";
import NonStopFlightCard from "@/components/Cards/NonStopFlightCard";
import { oneWayFlightData } from "./data/flightTestData";

describe("NonStopFlightCard", () => {
  const wrapper = mount(NonStopFlightCard, {
    propsData: {
      nonStopFlight: oneWayFlightData,
      ticketCount: 1
    }
  });
  it("renders the Non Stop Card", async () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Fires a Book event on succesful book from Non-stop Flights", async () => {
    wrapper.find("el-button").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("showBookingMessage")).toBeTruthy();
  });

  it("check NonStop Flights card has been rendered and it contains svg", () => {
    const form = wrapper.find("svg");
    expect(form.exists()).toBe(true);
  });
});
