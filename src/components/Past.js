import React, { useState, useEffect } from 'react';
import { formatDate } from "../utils/formatdate.js";
import config from "../config";

export const Past = function({ coords }) {
    const [date, setDate] = useState("");
    const [weather, setWeather] = useState();
    
    const [dayAfter, setDayAfter] = useState("");
  
    useEffect(() => {
      const dateObj = new Date(date);
      const dayAfter = dateObj.setDate(dateObj.getDate() + 1)
      setDayAfter(formatDate(dayAfter));
    }, [date]);
    
    async function onSubmit (e) {
      try {
        e.preventDefault();
        const {lat, lng} = coords;
        const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${lng}&start_date=${date}&end_date=${dayAfter}&key=${config.WEATHERBIT_API_KEY}`);
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
        <div>lat: {coords.lat} lon: {coords.lng}</div>
        {weather
          &&
          <>
            <div>{weather.temp} Celcius</div>
            <div>clouds: {weather.clouds}%</div>
            <div>{weather.snow === 0 ? "no snow" : "snowing"}</div>
            <div>precipitation: {weather.precip}</div>
            <div>pressure: {weather.pres}</div>
          </>
        }
      </div>
      </>
    );
  }
  