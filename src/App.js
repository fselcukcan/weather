import React, { useState, useEffect } from 'react';
import logo from './weather-ios-logo-svg-vector.svg';
import './App.css';
import { Tabs } from "@bumaga/tabs";
import config from "./config";
import {Tab, Panel, Today, ThisWeek, Past} from "./components";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function getCountries () {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      const countries = await response.json();
      setCountries(countries);
    }
    getCountries();
  }, []);

  const [selectedCountry, setSelectedCountry] = useState("");

  const [selectedCapital, setSelectedCapital] = useState();

  useEffect(() => {
    const capital = countries.find(country => country.name === selectedCountry);
    setSelectedCapital(capital);
  }, [selectedCountry, countries]);

  const [capitalCoords, setCapitalCoords] = useState();

  useEffect(() => {
    async function getCapital(selectedCapital, selectedCountry, key = config.OPENCAGEDATA_API_KEY) {
      try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${selectedCapital},${selectedCountry}&key=${key}`);
        const capital = await response.json();
        const capitalCoords = capital => capital.results[0].geometry;
        setCapitalCoords(capitalCoords(capital));
      } catch (error) {
        console.error("getCapitalCoords: ", error);
      }
    }
    if (selectedCapital && selectedCountry) {
      getCapital(selectedCapital, selectedCountry);
    }
  }, [selectedCapital, selectedCountry]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Select a country to get the weather data on coordinates of its capital city of today, this week, or a past date.
        </p>
        {/*<a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>*/}
        <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
          <option value="" disabled>{"Select a country"}</option>
          {
            countries.map((country, i) => 
              (
                <option
                  value={country.name}
                  key={i}>
                    {country.name}
                </option>
              )
            )
          }
        </select>

        {capitalCoords &&
        <Tabs>
          <div>
            <Tab>Today</Tab>
            <Tab>This week</Tab>
            <Tab>Past</Tab>
          </div>

          <Panel><Today coords={capitalCoords}></Today></Panel>
          <Panel><ThisWeek coords={capitalCoords}></ThisWeek></Panel>
          <Panel><Past coords={capitalCoords}></Past></Panel>
        </Tabs>
        }
      </header>
    </div>
  );
}

export default App;
