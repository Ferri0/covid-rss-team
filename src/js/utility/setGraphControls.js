import properties from "../properties";
import chart from "../chart/chart";

export default function () {
  const leftButton = document.querySelector(".graph-controls__left");
  const rightButton = document.querySelector(".graph-controls__right");
  const firstProp = document.querySelector(
    ".graph-controls__text--first-property"
  );
  const secondProp = document.querySelector(
    ".graph-controls__text--second-property"
  );
  const thirdProp = document.querySelector(
    ".graph-controls__text--third-property"
  );

  leftButton.addEventListener("click", () => {
    if (secondProp.classList.contains("graph-controls__text--visible")) {
      firstProp.style.left = 0;
      properties.graphDisplay = "cases";
      console.log(properties.graphDisplay);
      leftButton.classList.toggle("graph-controls--disabled");
      leftButton.disabled = true;
      secondProp.classList.remove("graph-controls__text--visible");
      firstProp.classList.add("graph-controls__text--visible");
      secondProp.style.left = "-100%";
      thirdProp.style.left = "-200%";
    } else if (thirdProp.classList.contains("graph-controls__text--visible")) {
      secondProp.style.left = 0;
      properties.graphDisplay = "deaths";
      rightButton.classList.toggle("graph-controls--disabled");
      rightButton.disabled = false;
      thirdProp.classList.remove("graph-controls__text--visible");
      secondProp.classList.add("graph-controls__text--visible");
      firstProp.style.left = "+100%";
      thirdProp.style.left = "-100%";
    }
    let stateValue = document.querySelector(`#dropdownChart`).value;
    chart(properties.graphDisplay, properties.region, properties.period, stateValue); // update chart
  });

  rightButton.addEventListener("click", () => {
    if (firstProp.classList.contains("graph-controls__text--visible")) {
      secondProp.style.left = 0;
      properties.graphDisplay = "deaths";
      leftButton.classList.toggle("graph-controls--disabled");
      leftButton.disabled = false;
      firstProp.classList.remove("graph-controls__text--visible");
      secondProp.classList.add("graph-controls__text--visible");
      firstProp.style.left = "+100%";
      thirdProp.style.left = "-100%";
    } else if (secondProp.classList.contains("graph-controls__text--visible")) {
      thirdProp.style.left = 0;
      properties.graphDisplay = "recovered";
      rightButton.classList.toggle("graph-controls--disabled");
      rightButton.disabled = true;
      secondProp.classList.remove("graph-controls__text--visible");
      thirdProp.classList.add("graph-controls__text--visible");
      secondProp.style.left = "+100%";
      firstProp.style.left = "+200%";
    }

    let stateValue = document.querySelector(`#dropdownChart`).value;

    chart(properties.graphDisplay, properties.region, properties.period, stateValue); // update chart
  });
}
