import properties from "../properties";
import chart from "../chart/chart";

export default function(){
  document.body.querySelector(`#dropdownChart`).addEventListener(`change`, event => {
    //console.log(event.target.value);
    chart(properties.graphDisplay, properties.region, properties.period, event.target.value);

  }, false);
}
