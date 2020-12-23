import { Grid } from "ag-grid-community";

/* UNDER CONSTRUCTION */
/* added only as example, to work with tables */
export default function (tableClass) {
  const columnDefs = [
    {
      headerName: "Country",
      field: "country",
      sortable: true,
      lockPosition: true,
      width: 160,
    },
    {
      headerName: "Cases",
      field: "cases",
      sortable: true,
      lockPosition: true,
      width: 140,
    },
  ];

  // set table depends on argument passed
  let eGridDiv = null;
  if (tableClass === "casesTable") {
    columnDefs[1].cellClass = "stats__table--cases-column";
    eGridDiv = document.querySelector(".stats__table--cases");
  } else if (tableClass === "deathsTable") {
    columnDefs[1].cellClass = "stats__table--deaths-column";
    eGridDiv = document.querySelector(".stats__table--deaths");
  } else if (tableClass === "recoveredTable") {
    columnDefs[1].cellClass = "stats__table--recovered-column";
    eGridDiv = document.querySelector(".stats__table--recovered");
  } else {
    throw new Error("wron argument passed to setTable function");
  }

  // specify the data
  const rowData = [
    { country: "US", cases: "17800000" },
    { country: "India", cases: "378020200" },
    { country: "France", cases: "1800450" },
    { country: "Germany", cases: "17800124" },
    { country: "Ireland", cases: "23478000" },
    { country: "Great Britain", cases: "17800" },
    { country: "Italy", cases: "178132001" },
    { country: "Spain", cases: "17800789" },
    { country: "Rome", cases: "17800887" },
    { country: "US", cases: "17800000" },
    { country: "India", cases: "378020200" },
    { country: "France", cases: "1800450" },
    { country: "Germany", cases: "17800124" },
    { country: "Ireland", cases: "23478000" },
    { country: "Great Britain", cases: "17800" },
    { country: "Italy", cases: "178132001" },
    { country: "Spain", cases: "17800789" },
    { country: "Rome", cases: "17800887" },
  ];

  // let the grid know which columns and what data to use
  const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
  };

  new Grid(eGridDiv, gridOptions);

  gridOptions.api.sizeColumnsToFit();
}
