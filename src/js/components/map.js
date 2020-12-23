import L from "leaflet";
import WorldData from "geojson-world-map";
import properties from "../properties";

// rename countries from worldData
WorldData.features[203].properties.name = "United States of America";
WorldData.features[167].properties.name = "Russian Federation";
WorldData.features[98].properties.name = "Iran, Islamic Republic of";
WorldData.features[113].properties.name = "Korea (South)";
WorldData.features[208].properties.name = "Viet Nam";
WorldData.features[55].properties.name = "Czech Republic";
WorldData.features[187].properties.name = "Syrian Arab Republic (Syria)";
WorldData.features[128].properties.name = "Macedonia, Republic of";
WorldData.features[27].properties.name = "Bosnia and Herzegovina";
WorldData.features[3].properties.name = "Western Sahara";
WorldData.features[37].properties.name = "Central African Republic";
WorldData.features[171].properties.name = "South Sudan";
WorldData.features[45].properties.name = "Congo (Brazzaville)";
WorldData.features[81].properties.name = "Equatorial Guinea";
WorldData.features[44].properties.name = "Congo (Kinshasa)";
WorldData.features[199].properties.name = "Tanzania, United Republic of";
WorldData.features[60].properties.name = "Dominican Republic";
WorldData.features[206].properties.name = "Venezuela (Bolivarian Republic)";

export default function viewMap() {
  const map = L.map("map").setView([40, 10], 2);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 10,
      minZoom: 1,
      center: [-34, 140],
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox/light-v9",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(map);

  // get color depending on population density value
  function getColor(d) {
    let param;
    if (d.name) {
      properties.apiData.Countries.forEach((item) => {
        if (item.Country === d.name) {
          param = item.TotalConfirmed;
        }
      });
    } else {
      param = d;
    }
    if (param > 500000) {
      return "#800026";
    }
    if (param > 300000) {
      return "#BD0026";
    }
    if (param > 100000) {
      return "#E31A1C";
    }
    if (param > 50000) {
      return "#FC4E2A";
    }
    if (param > 25000) {
      return "#FD8D3C";
    }
    if (param > 12500) {
      return "#FEB24C";
    }
    if (param > 7500) {
      return "#FED976";
    }
    return "#FFEDA0";
  }

  // control that shows state info on hover
  const info = L.control();

  info.onAdd = function () {
    this.div = L.DomUtil.create("div", "info");
    this.update();
    return this.div;
  };

  info.update = function (props) {
    if (props) {
      const countryName = props.name;
      let totalCases;
      let totalDeath;
      let totalRecovered;
      let newConfirmed;
      let newDeaths;
      let newRecovered;
      properties.apiData.Countries.forEach((item) => {
        if (item.Country === countryName) {
          totalCases = item.TotalConfirmed;
          totalDeath = item.TotalDeaths;
          totalRecovered = item.TotalRecovered;
          newConfirmed = item.NewConfirmed;
          newDeaths = item.NewDeaths;
          newRecovered = item.NewRecovered;
        }
      });
      if (totalCases === undefined) {
        totalCases = 0;
        totalDeath = 0;
        totalRecovered = 0;
        newConfirmed = 0;
        newDeaths = 0;
        newRecovered = 0;
      }

      this.div.innerHTML = `<h4>Country: ${countryName}</h4>
                           <div>New confirmed: ${newConfirmed}</div>
                           <div>New deaths: ${newDeaths}</div>
                           <div>New recovered: ${newRecovered}</div>
                           <div><span style="background: ${getColor(
                             totalCases
                           )}"></span>Total cases: ${totalCases}</div>
                           <div>Total death: ${totalDeath}</div>
                           <div>Total recovered: ${totalRecovered}</div>
                           `;
    } else {
      this.div.innerHTML = `Hover over a country`;
    }
  };

  info.addTo(map);

  function style(feature) {
    return {
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
      fillColor: getColor(feature.properties),
    };
  }

  function highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 2,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    info.update(layer.feature.properties);
  }

  let geojson;

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: highlightFeature,
    });
  }

  geojson = L.geoJson(WorldData, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);

  map.attributionControl.addAttribution(
    'Covid data &copy; <a href="https://covid19api.com/" target="_blank">Covid API</a>'
  );

  const legend = L.control({ position: "bottomright" });

  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "info legend");
    const grades = [0, 7500, 12500, 25000, 50000, 100000, 300000, 500000];
    const labels = [];
    let from;
    let to;

    for (let i = 0; i < grades.length; i += 1) {
      from = grades[i];
      to = grades[i + 1];

      if (grades[i + 1]) {
        labels.push(`<i style="background:${getColor(from + 1)};"></i>${to} +`);
      }
    }

    div.innerHTML = labels.join("<br>");
    return div;
  };

  legend.addTo(map);

  const globalStat = L.control({ position: "bottomleft" });

  globalStat.onAdd = function () {
    const div = L.DomUtil.create("div", "info global-stat");
    const globalNewConfirmed = properties.apiData.Global.NewConfirmed;
    const globalNewDeaths = properties.apiData.Global.NewDeaths;
    const globalNewRecovered = properties.apiData.Global.NewRecovered;
    const globalTotalConfirmed = properties.apiData.Global.TotalConfirmed;
    const globalTotalDeaths = properties.apiData.Global.TotalDeaths;
    const globalTotalRecovered = properties.apiData.Global.TotalRecovered;

    div.innerHTML = `<h4>Global Statistics</h4>
                     <div>New confirmed: ${globalNewConfirmed}</div>
                     <div>New deaths: ${globalNewDeaths}</div>
                     <div>New recovered: ${globalNewRecovered}</div>
                     <div>Total confirmed: ${globalTotalConfirmed}</div>
                     <div>Total deaths: ${globalTotalDeaths}</div>
                     <div>Total recovered: ${globalTotalRecovered}</div>
                    `;
    return div;
  };

  globalStat.addTo(map);
}
