import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Tabs } from "@bumaga/tabs";
import config from "./config";
import {Tab, Panel, Today, Future, Past} from "./components";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function getCountries () {
      try {
        const response = await fetch("https://restcountries.eu/rest/v2/all");
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const countries = await response.json();
        setCountries(countries);
      } catch (error) {
        console.error(error);
      }
      
    }
    getCountries();
  }, []);

  const [selectedCountryName, setSelectedCountryName] = useState("");

  const [selectedCapitalName, setSelectedCapitalName] = useState();

  useEffect(() => {
    if (selectedCountryName) {
      const selectedCountry = countries.find(country => country.name === selectedCountryName);
      setSelectedCapitalName(selectedCountry.capital);
    }
  }, [selectedCountryName, countries]);

  const [capitalCoords, setCapitalCoords] = useState();

  useEffect(() => {
    async function getCapital(selectedCapitalName, selectedCountryName, key = config.OPENCAGEDATA_API_KEY) {
      try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${selectedCapitalName},${selectedCountryName}&key=${key}`);

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const capitals = await response.json();
        const capitalCoords = capitals => capitals.results[0].geometry;
        setCapitalCoords(capitalCoords(capitals));
      } catch (error) {
        console.error(error);
      }
    }
    if (selectedCapitalName && selectedCountryName) {
      getCapital(selectedCapitalName, selectedCountryName);
    }
  }, [selectedCapitalName, selectedCountryName]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Select a country to get the weather data of today, this week, or a past date on coordinates of its capital city.
        </p>

        <select
          value={selectedCountryName}
          onChange={e => setSelectedCountryName(e.target.value)}
          className="country-select">
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
        
        <div>{selectedCapitalName}</div>

        {capitalCoords &&
        <Tabs>
          <div>
            <Tab>Today</Tab>
            <Tab>This week</Tab>
            <Tab>Past</Tab>
          </div>

          <Panel><Today coords={capitalCoords}></Today></Panel>
          <Panel><Future coords={capitalCoords} days={7}></Future></Panel>
          <Panel><Past coords={capitalCoords}></Past></Panel>
        </Tabs>
        }
      </header>
    </div>
  );
}

export default App;
