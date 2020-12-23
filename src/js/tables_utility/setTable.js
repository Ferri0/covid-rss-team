import { Grid } from "ag-grid-community";
import properties from "../properties";

// run each time when need to change table data
// get table class of table needed to change
export default function (tableClass) {
  // clear previous table data
  const currentTable = document.querySelector(`.stats__table--${tableClass}`);
  currentTable.innerHTML = "";

  // set table depends on argument passed
  // first column same for all tables
  const columnDefs = [
    {
      headerName: "Country",
      field: "Country",
      sortable: true,
      lockPosition: true,
      flex: 1,
    },
  ];

  // define table variables to define them from blocks
  let eGridDiv;
  let rowData;
  if (properties[`${tableClass}Table`].units !== "absolute") {
    // set empty tables if selected country
    if (properties.region !== "World") {
      columnDefs[0].field = "----";
      columnDefs[0].headerName = "----";
      columnDefs[0].sortable = false;
      columnDefs.push({
        headerName: "----",
        field: "----",
        sortable: false,
        lockPosition: true,
        flex: 1,
      });
      eGridDiv = currentTable;
      rowData = [];
    }

    // set cases table
    else if (tableClass === "cases") {
      const fieldName =
        properties.period === "All time" ? "TotalConfirmedR" : "NewConfirmedR";
      columnDefs.push({
        headerName: "Cases",
        field: fieldName,
        sortable: true,
        lockPosition: true,
        flex: 1,
      });
      columnDefs[1].cellClass = "stats__table--cases-column";
      eGridDiv = document.querySelector(".stats__table--cases");
      rowData = properties.apiDataRelative;
    }

    // set deaths table
    else if (tableClass === "deaths") {
      const fieldName =
        properties.period === "All time" ? "TotalDeathsR" : "NewDeathsR";
      columnDefs.push({
        headerName: "Deaths",
        field: fieldName,
        sortable: true,
        lockPosition: true,
        flex: 1,
      });
      columnDefs[1].cellClass = "stats__table--deaths-column";
      eGridDiv = document.querySelector(".stats__table--deaths");
      rowData = properties.apiDataRelative;
    }

    // set recovered table
    else if (tableClass === "recovered") {
      const fieldName =
        properties.period === "All time" ? "TotalRecoveredR" : "NewRecoveredR";
      columnDefs.push({
        headerName: "Recovered",
        field: fieldName,
        sortable: true,
        lockPosition: true,
        flex: 1,
      });
      columnDefs[1].cellClass = "stats__table--recovered-column";
      eGridDiv = document.querySelector(".stats__table--recovered");
      rowData = properties.apiDataRelative;
    }

    // throw error on wrong argument
    else {
      throw new Error("wron argument passed to setTable function");
    }
  } else {
    // set empty tables if selected country
    if (properties.region !== "World") {
      columnDefs[0].field = "----";
      columnDefs[0].headerName = "----";
      columnDefs[0].sortable = false;
      columnDefs.push({
        headerName: "----",
        field: "----",
        sortable: false,
        lockPosition: true,
        flex: 1,
      });
      eGridDiv = currentTable;
      rowData = [];
    }

    // set cases table
    else if (tableClass === "cases") {
      const fieldName =
        properties.period === "All time" ? "TotalConfirmed" : "NewConfirmed";
      columnDefs.push({
        headerName: "Cases",
        field: fieldName,
        sortable: true,
        lockPosition: true,
        flex: 1,
      });
      columnDefs[1].cellClass = "stats__table--cases-column";
      eGridDiv = document.querySelector(".stats__table--cases");
      rowData = properties.apiData.Countries;
    }

    // set deaths table
    else if (tableClass === "deaths") {
      const fieldName =
        properties.period === "All time" ? "TotalDeaths" : "NewDeaths";
      columnDefs.push({
        headerName: "Deaths",
        field: fieldName,
        sortable: true,
        lockPosition: true,
        flex: 1,
      });
      columnDefs[1].cellClass = "stats__table--deaths-column";
      eGridDiv = document.querySelector(".stats__table--deaths");
      rowData = properties.apiData.Countries;
    }

    // set recovered table
    else if (tableClass === "recovered") {
      const fieldName =
        properties.period === "All time" ? "TotalRecovered" : "NewRecovered";
      columnDefs.push({
        headerName: "Recovered",
        field: fieldName,
        sortable: true,
        lockPosition: true,
        flex: 1,
      });
      columnDefs[1].cellClass = "stats__table--recovered-column";
      eGridDiv = document.querySelector(".stats__table--recovered");
      rowData = properties.apiData.Countries;
    }

    // throw error on wrong argument
    else {
      throw new Error("wron argument passed to setTable function");
    }
  }

  // let the grid know which columns and what data to use
  const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
  };

  // build table with created parameters
  new Grid(eGridDiv, gridOptions);
}
