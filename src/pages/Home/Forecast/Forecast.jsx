import React from 'react';
import PropTypes from 'prop-types';
import './Forecast.css';

const Forecast = ({ forecastGroupedByDay }) => {
  if (!forecastGroupedByDay) {
    return (
      <div className="forecast-container">
        <h3>Данные прогноза недоступны или все еще подгружаются....</h3>
      </div>
    )
  }

  return (
    <div className="forecast-container">
      <h3>Прогноз на следующие сутки по часам</h3>
      {Object.keys(forecastGroupedByDay).map((day) => (
        <div className="forecast-day" key={day}>
          <h4>{day}</h4>
          {forecastGroupedByDay[day].map((hourData) => (
            <div className="forecast-hour" key={hourData.dt}>
              <p>Время: {new Date(hourData.dt * 1000).toLocaleTimeString()}</p>
              <p>Индекс качества воздуха: {hourData.main.aqi} (AQI)</p>
              <p>CO: {hourData.components.co} µg/m³</p>
              <p>NO2: {hourData.components.no2} µg/m³</p>
              <p>O3: {hourData.components.o3} µg/m³</p>
              <p>SO2: {hourData.components.so2} µg/m³</p>
              <p>PM10: {hourData.components.pm10} µg/m³</p>
              <p>PM2.5: {hourData.components.pm2_5} µg/m³</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

Forecast.propTypes = {
  forecastGroupedByDay: PropTypes.object,
};

export default Forecast;
