// styles
import "jsuites/dist/jsuites.css"; // dropdown styles
import "ag-grid-community/dist/styles/ag-grid.css"; // table styles
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css"; // table styles (dark)
import "leaflet/dist/leaflet.css"; // leaflet css
import "../scss/style.scss"; // current project styles

// modules
import getApiData from "./utility/getApiData";
import setDropdowns from "./components/setDropdowns";
import setTableControls from "./tables_utility/setTableControls";
import setGraphControls from "./utility/setGraphControls";
import setFullScrBtns from "./components/setFullScrBtns";
import updateData from "./utility/updateData";
import chart from "./chart/chart";
import viewMap from "./components/map";
import setApiDataRelative from "./utility/setApiDataRelative";

// callback function as arg to set default page after fetches completed
getApiData(updateData, viewMap, setDropdowns, setApiDataRelative);

// display and set up controls for each of three tables
setTableControls("casesTable");
setTableControls("deathsTable");
setTableControls("recoveredTable");

// set up graph controls
setGraphControls();

// display chart
chart();

// display and set up fullscreen buttons for main blocks
setFullScrBtns();
