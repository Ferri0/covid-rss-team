import properties from "../properties";
import isStatusChanged from "./isStatusChanged";
import updateCounter from "../tables_utility/updateCounter";
import setTable from "../tables_utility/setTable";
import chart from "../chart/chart";

/*
 * run this each time any property of page changes,
 * check all properties, find that one which changes and
 * change page depends on new properties values
 */
export default (function () {
  // previous properties values
  // deafult values is null to set all values after page load
  let prevCasesTableUnits = null;
  let prevDeathsTableUnits = null;
  let prevRecoveredTableUnits = null;

  return function () {
    // check and set cases table
    if (
      isStatusChanged() ||
      prevCasesTableUnits !== properties.casesTable.units
    ) {
      updateCounter("cases");
      setTable("cases");
      prevCasesTableUnits = properties.casesTable.units;
    }

    // check and set deaths table
    if (
      isStatusChanged() ||
      prevDeathsTableUnits !== properties.deathsTable.units
    ) {
      updateCounter("deaths");
      setTable("deaths");
      prevDeathsTableUnits = properties.deathsTable.units;
    }

    // check and set recovered table
    if (
      isStatusChanged() ||
      prevRecoveredTableUnits !== properties.recoveredTable.units
    ) {
      updateCounter("recovered");
      setTable("recovered");
      prevRecoveredTableUnits = properties.recoveredTable.units;
    }

    // set up last update date
    const lastUpdateDate = document.querySelector(".last-update--date");
    const lastUpdateTime = document.querySelector(".last-update--time");
    if (lastUpdateDate.innerText === "") {
      lastUpdateDate.innerText = properties.apiData.Date.slice(0, 10);
      lastUpdateTime.innerText = properties.apiData.Date.slice(11, -1);
    }

    if (isStatusChanged() || properties.region !== undefined) {
      chart(properties.graphDisplay, properties.region, properties.period);
    }
  };
})();
