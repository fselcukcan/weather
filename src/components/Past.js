import React, { useState, useEffect } from 'react';
import { formatDate, addDays } from "../utils/libdate.js";
import config from "../config";

export const Past = function({ coords }) {
    const [date, setDate] = useState("");
    const [weather, setWeather] = useState();
    
    const [dayAfter, setDayAfter] = useState("");
  
    useEffect(() => {
      const dayAfter = addDays(date, 1);
      setDayAfter(formatDate(dayAfter));
    }, [date]);
    
    async function onSubmit (e) {
      try {
        e.preventDefault();
        const {lat, lng} = coords;

        const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${lng}&start_date=${date}&end_date=${dayAfter}&key=${config.WEATHERBIT_API_KEY}`);

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const weather = await response.json();
        setWeather(weather.data[0]);
      } catch(error) {
        console.error(error);
      }
    }
    
    return (
      <>
        <form onSubmit={onSubmit}>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
          <input type="submit" value="Submit"/>
        </form>
  
        <div>
        {weather
          &&
          <>
            <div>{weather.temp} Celcius</div>
            <div>max/min: {weather.max_temp}/{weather.min_temp} Celcius</div>
            <div title="[Satellite based] average cloud coverage">clouds: {weather.clouds}%</div>
            <div title="Accumulated snowfall">snowfall: {weather.snow} mm</div>
            <div>snow depth: {weather.snow_depth} mm</div>
            <div title="Accumulated liquid equivalent precipitation">precipitation: {weather.precip} mm</div>
            <div>wind speed: {weather.wind_spd} m/s</div>
            <div>pressure: {weather.pres} mb (milibar)</div>
          </>
        }
      </div>
      </>
    );
  }
  