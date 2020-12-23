import properties from "../properties";

export default function (country) {
  const populationArray = properties.apiDataCountries.find((e) => {
    // fix difference between countries names in apis
    let countryName = null;
    switch (country) {
      case "Bolivia":
        countryName = "Bolivia (Plurinational State of)";
        break;
      case "Cape Verde":
        countryName = "Cabo Verde";
        break;
      case "Congo (Brazzaville)":
        countryName = "Congo";
        break;
      case "Congo (Kinshasa)":
        countryName = "Congo (Democratic Republic of the)";
        break;
      case "Holy See (Vatican City State)":
        countryName = "Holy See";
        break;
      case "Iran, Islamic Republic of":
        countryName = "Iran (Islamic Republic of)";
        break;
      case "Korea (South)":
        countryName = "Korea (Democratic People's Republic of)";
        break;
      case "Lao PDR":
        countryName = "Lao People's Democratic Republic";
        break;
      case "Macao, SAR China":
        countryName = "Macao";
        break;
      case "Macedonia, Republic of":
        countryName = "Macedonia (the former Yugoslav Republic of)";
        break;
      case "Moldova":
        countryName = "Moldova (Republic of)";
        break;
      case "Palestinian Territory":
        countryName = "Palestine, State of";
        break;
      case "Saint Vincent and Grenadines":
        countryName = "Saint Barthélemy";
        break;
      case "Syrian Arab Republic (Syria)":
        countryName = "Syrian Arab Republic";
        break;
      case "Taiwan, Republic of China":
        countryName = "Taiwan";
        break;
      case "United Arab Emirates":
        countryName = "United Arab Emirates";
        break;
      case "United Kingdom":
        countryName = "United Kingdom of Great Britain and Northern Ireland";
        break;
      case "Venezuela (Bolivarian Republic)":
        countryName = "Venezuela (Bolivarian Republic of)";
        break;
      default:
        countryName = country;
        break;
    }

    if (countryName === e.name) {
      return countryName;
    }
    return null;
  });
  return populationArray.name;
}
