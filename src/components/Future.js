import React, { useState, useEffect } from 'react';
import config from "../config";

export const Future = function({ coords, days }) {
    const [weather, setWeather] = useState();
  
    useEffect(() => {
      async function getWeather(coords, key = config.WEATHERBIT_API_KEY) {
        try {
          const {lat, lng} = coords;

          const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&days=${days}&key=${key}`);

          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }

          const weather = await response.json();
          setWeather(weather);
        } catch (error) {
          console.error(error);
        }
      }
      if (coords) {
        getWeather(coords);
      }
    }, [coords, days]);
      
    return (
      <div>
        {weather
          &&
          weather.data.map((datum, i) => 
          <div key={i}>
            <h3>{datum.valid_date}</h3>
            <div>{datum.temp} Celcius</div>
            <div>max/min: {datum.max_temp}/{datum.min_temp} Celcius</div>
            <div>feels like max/min {datum.app_max_temp}/{datum.app_min_temp} Celcius</div>
            <div>{datum.weather.description}</div>
            <div>clouds: {datum.clouds}%</div>
            <div title="Accumulated snowfall">{datum.snow} mm</div>
            <div>snow depth: {datum.snow_depth} mm</div>
            <div>probability of precipitation: {datum.pop} %</div>
            <div title="Accumulated liquid equivalent precipitation">precipitation: {datum.precip} mm</div>
            <div>wind direction: {datum.wind_cdir_full}</div>
            <div>wind speed: {datum.wind_spd} m/s</div>
            <div>pressure: {datum.pres} mb (milibar)</div>
            <div>wind direction: {datum.wind_cdir_full}</div>
            <div>wind speed: {datum.wind_spd} m/s</div>
          </div>
          )
        }
      </div>
    );
  }