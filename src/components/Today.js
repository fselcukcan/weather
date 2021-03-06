import React, { useState, useEffect } from 'react';
import config from "../config";

export const Today = ({ coords }) => {
    const [weather, setWeather] = useState();
  
    useEffect(() => {
      async function getWeather(coords, key = config.WEATHERBIT_API_KEY) {
        try {
          const {lat, lng} = coords;
          
          const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${key}`);

          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }

          const weather = await response.json();
          setWeather(weather.data[0]);
        } catch (error) {
          console.error(error);
        }
      }
      if (coords) {
        getWeather(coords);
      }
    }, [coords]);
      
    return (
      <div>
        {weather
          &&
          <>
            <div>{weather.temp} Celcius</div>
            <div>feels like {weather.app_temp} Celcius</div>
            <div>{weather.weather.description}</div>
            <div>clouds: {weather.clouds}%</div>            
            <div title="Accumulated snowfall">snowfall: {weather.snow} mm</div>
            <div title="Accumulated liquid equivalent precipitation">precipitation: {weather.precip} mm</div>
            <div>wind direction: {weather.wind_cdir_full}</div>
            <div>wind speed: {weather.wind_spd} m/s</div>
            <div>pressure: {weather.pres}</div>
            <div>observation time: {weather.ob_time}</div>
          </>
        }
      </div>
    );
  };
  
  
  
  