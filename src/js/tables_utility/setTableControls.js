import properties from "../properties";
import updateData from "../utility/updateData";

/*
 * this function display controls to table depends on arg passed in
 * and set eventListeners (pagination + change properties on click)
 */

export default function (table) {
  // create controls block
  const statsControls = document.createElement("div");
  statsControls.classList.add("stats__controls");

  // create left button
  const statsControlsLeft = document.createElement("button");
  statsControlsLeft.classList.add("stats__controls--left");
  statsControlsLeft.classList.add("stats__controls--disabled");

  // append arrow img to left button
  const arrowImgLeft = document.createElement("img");
  arrowImgLeft.src = "./img/arrow.svg";
  arrowImgLeft.alt = "arrow-left";
  statsControlsLeft.append(arrowImgLeft);

  // left button disabled by default
  statsControlsLeft.disabled = true;

  // create text block (for controls block) with 2 properties
  const statsControlsText = document.createElement("div");
  statsControlsText.classList.add("stats__controls--text");

  const statsControlsFirstProp = document.createElement("div");
  statsControlsFirstProp.classList.add("stats__controls--first-property");
  statsControlsFirstProp.innerText = "Absolute numbers";

  const statsControlsSecondProp = document.createElement("div");
  statsControlsSecondProp.classList.add("stats__controls--second-property");
  statsControlsSecondProp.innerText = "Per 100000";

  statsControlsText.append(statsControlsFirstProp);
  statsControlsText.append(statsControlsSecondProp);

  // create right button
  const statsControlsRight = document.createElement("button");
  statsControlsRight.classList.add("stats__controls--right");

  // append arrow img to right button
  const arrowImgRight = document.createElement("img");
  arrowImgRight.src = "./img/arrow.svg";
  arrowImgRight.alt = "arrow-right";
  statsControlsRight.append(arrowImgRight);

  // set left button (pagination + change properties)
  statsControlsLeft.addEventListener("click", () => {
    statsControlsLeft.disabled = true;
    statsControlsLeft.classList.toggle("stats__controls--disabled");
    statsControlsRight.disabled = false;
    statsControlsRight.classList.toggle("stats__controls--disabled");
    statsControlsFirstProp.style.left = "";
    statsControlsSecondProp.style.left = "";
    if (table === "casesTable") properties.casesTable.units = "absolute";
    else if (table === "deathsTable") properties.deathsTable.units = "absolute";
    else if (table === "recoveredTable")
      properties.recoveredTable.units = "absolute";
    else throw new Error("wrong argument passed in setTableControls func");
    setTimeout(() => {
      updateData();
    }, 350);
  });

  // set right button (pagination + change properties)
  statsControlsRight.addEventListener("click", () => {
    statsControlsRight.disabled = true;
    statsControlsRight.classList.toggle("stats__controls--disabled");
    statsControlsLeft.disabled = false;
    statsControlsLeft.classList.toggle("stats__controls--disabled");
    statsControlsFirstProp.style.left = "100%";
    statsControlsSecondProp.style.left = "0";
    if (table === "casesTable") properties.casesTable.units = "relative";
    else if (table === "deathsTable") properties.deathsTable.units = "relative";
    else if (table === "recoveredTable")
      properties.recoveredTable.units = "relative";
    else throw new Error("wrong argument passed in setTableControls func");
    setTimeout(() => {
      updateData();
    }, 350);
  });

  // append all inner blocks to controls block
  statsControls.append(statsControlsLeft);
  statsControls.append(statsControlsText);
  statsControls.append(statsControlsRight);

  // append controls block to table depends on arg passed in
  if (table === "casesTable") {
    const casesTable = document.querySelector(".stats__table--cases");
    casesTable.parentElement.append(statsControls);
  } else if (table === "deathsTable") {
    const deathsTable = document.querySelector(".stats__table--deaths");
    deathsTable.parentElement.append(statsControls);
  } else if (table === "recoveredTable") {
    const recoveredTable = document.querySelector(".stats__table--recovered");
    recoveredTable.parentElement.append(statsControls);
  } else {
    throw new Error("wrong argument passed in setTableControls func");
  }
}
