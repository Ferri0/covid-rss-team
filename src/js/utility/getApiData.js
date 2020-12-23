import setDropdowns from "../components/setDropdowns";
import properties from "../properties";

export default async function getApiData() {
  async function getCovidData() {
    const url = "https://api.covid19api.com/summary";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async function getCountriesData() {
    const url =
      "https://restcountries.eu/rest/v2/all?fields=name;population;flag";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  properties.apiData = await getCovidData();
  properties.apiDataCountries = await getCountriesData();

  // create countries array with default first element World
  const countries = ["World"];
  for (let i = 0; i < properties.apiData.Countries.length; i += 1) {
    countries[i + 1] = properties.apiData.Countries[i].Country;
  }

  // run all callback functions to set up data by default
  Array.from(arguments).forEach((callback) => {
    if (callback === setDropdowns) callback(countries);
    else callback();
  });
}
