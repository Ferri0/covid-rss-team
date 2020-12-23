import properties from "../properties";

// set counter depends on properties values
// argument is part of table class name: cases || deaths || recovered
export default async function (tableName) {
  const counterElement = document.querySelector(`.stats__count--${tableName}`);

  // set default world population (23.12.2020)
  const worldPopulation = 7856170432;

  // get current country data
  let currentCountryData = null;
  let currentCountryPopulation = null;
  if (properties.region !== "World") {
    currentCountryData = properties.apiData.Countries.filter((e) => {
      if (e.Country === properties.region) return e;
      return null;
    });

    const populationArray = properties.apiDataCountries.filter((e) => {
      // fix difference between countries names in apis
      let countryName = null;
      switch (e.name) {
        case "Bolivia (Plurinational State of)":
          countryName = "Bolivia";
          break;
        case "Cabo Verde":
          countryName = "Cape Verde";
          break;
        case "Congo":
          countryName = "Congo (Brazzaville)";
          break;
        case "Congo (Democratic Republic of the)":
          countryName = "Congo (Kinshasa)";
          break;
        case "Holy See":
          countryName = "Holy See (Vatican City State)";
          break;
        case "Iran (Islamic Republic of)":
          countryName = "Iran, Islamic Republic of";
          break;
        case "Korea (Democratic People's Republic of)":
          countryName = "Korea (South)";
          break;
        case "Lao People's Democratic Republic":
          countryName = "Lao PDR";
          break;
        case "Macao":
          countryName = "Macao, SAR China";
          break;
        case "Macedonia (the former Yugoslav Republic of)":
          countryName = "Macedonia, Republic of";
          break;
        case "Moldova (Republic of)":
          countryName = "Moldova";
          break;
        case "Palestine, State of":
          countryName = "Palestinian Territory";
          break;
        case "Saint Barthélemy":
          countryName = "Saint Vincent and Grenadines";
          break;
        case "Syrian Arab Republic":
          countryName = "Syrian Arab Republic (Syria)";
          break;
        case "Taiwan":
          countryName = "Taiwan, Republic of China";
          break;
        case "United Arab Emirates":
          countryName = "United Arab Emirates";
          break;
        case "United Kingdom of Great Britain and Northern Ireland":
          countryName = "United Kingdom";
          break;
        case "Venezuela (Bolivarian Republic of)":
          countryName = "Venezuela (Bolivarian Republic)";
          break;
        default:
          countryName = e.name;
          break;
      }

      if (countryName === properties.region) return e;
      return null;
    });

    if (properties.region !== "World" && properties.region !== "") {
      currentCountryPopulation = populationArray[0].population;
    }
  }

  // catch empty value of properties.region which happens on select selected item
  if (properties.region === "") properties.region = "World";

  switch (tableName) {
    case "cases":
      // check properties period and set counter depends on it value
      // for all world
      if (properties.region === "World") {
        if (properties.period === "All time") {
          counterElement.innerText = properties.apiData.Global.TotalConfirmed;
        } else {
          counterElement.innerText = properties.apiData.Global.NewConfirmed;
        }
        // check properties points and set counter depends on it value
        if (properties.casesTable.units !== "absolute") {
          counterElement.innerText = Math.ceil(
            (+counterElement.innerText / worldPopulation) * 100000
          );
        }
      } else {
        // for selected country
        if (properties.period === "All time") {
          counterElement.innerText = currentCountryData[0].TotalConfirmed;
        } else {
          counterElement.innerText = currentCountryData[0].NewConfirmed;
        }
        // check properties points and set counter depends on it value
        if (properties.casesTable.units !== "absolute") {
          counterElement.innerText = Math.ceil(
            (+counterElement.innerText / currentCountryPopulation) * 100000
          );
        }
      }
      break;
    case "deaths":
      // check properties period and set counter depends on it value
      if (properties.region === "World") {
        if (properties.period === "All time") {
          counterElement.innerText = properties.apiData.Global.TotalDeaths;
        } else {
          counterElement.innerText = properties.apiData.Global.NewDeaths;
        }
        // check properties points and set counter depends on it value
        if (properties.deathsTable.units !== "absolute") {
          counterElement.innerText = Math.ceil(
            (+counterElement.innerText / worldPopulation) * 100000
          );
        }
      } else {
        if (properties.period === "All time") {
          counterElement.innerText = currentCountryData[0].TotalDeaths;
        } else {
          counterElement.innerText = currentCountryData[0].NewDeaths;
        }
        // check properties points and set counter depends on it value
        if (properties.deathsTable.units !== "absolute") {
          counterElement.innerText = Math.ceil(
            (+counterElement.innerText / currentCountryPopulation) * 100000
          );
        }
      }

      break;
    case "recovered":
      // check properties period and set counter depends on it value
      if (properties.region === "World") {
        if (properties.period === "All time") {
          counterElement.innerText = properties.apiData.Global.TotalRecovered;
        } else {
          counterElement.innerText = properties.apiData.Global.NewRecovered;
        }
        // check properties points and set counter depends on it value
        if (properties.recoveredTable.units !== "absolute") {
          counterElement.innerText = Math.ceil(
            (+counterElement.innerText / worldPopulation) * 100000
          );
        }
      } else {
        if (properties.period === "All time") {
          counterElement.innerText = currentCountryData[0].TotalRecovered;
        } else {
          counterElement.innerText = currentCountryData[0].NewRecovered;
        }

        // check properties points and set counter depends on it value
        if (properties.recoveredTable.units !== "absolute") {
          counterElement.innerText = Math.ceil(
            (+counterElement.innerText / currentCountryPopulation) * 100000
          );
        }
      }
      break;
    default:
      throw new Error("Passed wrong argument to updateCounter func");
  }
}
