import { useEffect, useState } from "react";
import axios from "axios";

const CountryWithDetails = ({ country, displayValue }) => {
  let languages = [];
  for (const [key, value] of Object.entries(country.languages)) {
    languages.push(<li key={key}>{value}</li>);
  }

  return (
    <div id={country.name.common} style={{ display: displayValue }}>
      <h2>{country.name.common}</h2>
      <br />
      <p>{`Capital: ${country.capital[0]}`}</p>
      <p>{`Population: ${country.population}`}</p>
      <p>{`Area: ${country.area}`}</p>
      <br />
      <p>Languages:</p>
      <ul>{languages}</ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`}></img>
    </div>
  );
};

const Countries = ({ countries }) => {
  function showCountryDetail(id) {
    const element = document.getElementById(id);
    element.style.display = "block";
    console.log(element);
  }

  let value;
  switch (true) {
    case countries.length === 0:
      value = <p>Nothing matches, please enter characters</p>;
      break;
    case countries.length === 1:
      value = (
        <CountryWithDetails country={countries[0]} displayValue="block" />
      );
      break;
    case countries.length >= 10:
      value = <p>Too many matches, specify more!</p>;
      break;
    default:
      value = (
        <ul>
          {countries.map((country, i) => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => showCountryDetail(country.name.common)}>
                Info
              </button>{" "}
              <br />
              <CountryWithDetails country={country} displayValue="none" />
            </li>
          ))}
        </ul>
      );
  }
  return value;
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data));
  }, []);

  let filteredCountries = [];
  if (filter.trim().length > 0) {
    filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
  }

  return (
    <div>
      <p>
        find countries{" "}
        <input onChange={(e) => setFilter(e.target.value)}></input>
      </p>
      <Countries countries={filteredCountries} />
      <p>debug: {filter}</p>
    </div>
  );
}

export default App;
