import jSuites from "jsuites";
import properties from "../properties";
import updateData from "../utility/updateData";

// this function set both dropdown menus in header
export default function (countriesArray) {
  // region dropdown
  const regionDropdown = jSuites.dropdown(
    document.getElementById("region-dropdown"),
    {
      type: "default",
      // default value
      value: "World",
      data: countriesArray,
      autocomplete: true,
      lazyLoading: true,
      width: "100%",
      // change properties when dropdown menu close (on each change of value)
      onclose: function () {
        properties.region = regionDropdown.getValue();
        updateData();
        if (this.value === "") {
          regionDropdown.setValue("World");
          // did this to show selected item if twice choice same item, dont find another way
          regionDropdown.open();
          regionDropdown.close();
          window.scroll(0, 0);
        }
      },
    }
  );

  properties.regionDropdown = regionDropdown;

  // period dropdown
  const periodDropdown = jSuites.dropdown(
    document.getElementById("period-dropdown"),
    {
      type: "default",
      value: "All time",
      data: ["All time", "Last day"],
      autocomplete: true,
      lazyLoading: true,
      width: "100%",
      // change properties when dropdown menu close (on each change of value)
      onclose: function () {
        properties.period = periodDropdown.getValue();
        updateData();
        if (this.value === "") {
          periodDropdown.setValue("All time");
          // did this to show selected item if twice choice same item, dont find another way
          periodDropdown.open();
          periodDropdown.close();
          window.scroll(0, 0);
        }
      },
    }
  );
}
