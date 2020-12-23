// special object used to store state of website
// used to check current state and display right information
export default {
  apiData: null,
  apiDataCountries: null,
  apiDataRelative: null,
  region: "World",
  period: "All time",
  graphDisplay: "cases",
  casesTable: {
    units: "absolute",
  },
  deathsTable: {
    units: "absolute",
  },
  recoveredTable: {
    units: "absolute",
  },
};
