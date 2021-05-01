import { mount } from "@vue/test-utils";
import LayoverFlightCard from "@/components/Cards/LayoverFlightCard";
import { layOverFlightdata } from "./data/flightTestData";

describe("LayoverFlightCard", () => {
  const wrapper = mount(LayoverFlightCard, {
    propsData: {
      layOverFlights: layOverFlightdata,
      ticketCount: 1
    }
  });
  it("renders the Non Stop Card", async () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Fires a Book event on succesful book from Layover Flights", async () => {
    wrapper.find("el-button").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("showBookingMessage")).toBeTruthy();
  });

  it("check NonStop Flights card has been rendered and it contains svg", () => {
    const form = wrapper.find("svg");
    expect(form.exists()).toBe(true);
  });

  it("check NonStop Flights card has been rendered and it contains showLink", () => {
    const form = wrapper.find(".showDetailsLink");
    expect(form.exists()).toBe(true);
  });

  it("Click on show details link", async () => {
    expect(wrapper.vm.showDetails).toBe(false);
    wrapper.find(".showDetailsLink").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showDetails).toBe(true);
    expect(wrapper.emitted("showBookingMessage")).toBeTruthy();
  });
});
