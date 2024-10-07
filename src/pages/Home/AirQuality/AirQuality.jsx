import React from 'react';
import PropTypes from 'prop-types';
import './AirQuality.css'; // Импортируем стили

const AirQuality = ({ airData }) => {
  if (!airData || !airData.list || airData.list.length === 0) {
    return <p className="description">Данные о качестве воздуха недоступны.</p>;
  }

  const { aqi } = airData.list[0].main;
  const { co, no2, o3, so2, pm10, pm2_5 } = airData.list[0].components;

  return (
    <div className="air-quality-widget">
      <div className="location-info">
        <i className="fa-solid fa-location-arrow" />
        <span>Астрахань</span>
        <p>Сейчас 22:27</p>
      </div>
      <div className="air-quality-info">
        <div className="temperature">
          <span className="temp-value">{aqi} AQI</span>
        </div>
        <div className="divider">
          <div className="bottom-divider" />
          <div className="after-divider" />
        </div>
        <div className="additional-info">
          <div>
            <span className="indicator">🟢</span>
            <span className="pollutant">Угарный газ (CO)</span>
            <span className="value">{co} µg/m³</span>
          </div>
          <div>
            <span className="indicator">🟢</span>
            <span className="pollutant">Оксид Азота (NO2)</span>
            <span className="value">{no2} µg/m³</span>
          </div>
          <div>
            <span className="indicator">🟠</span>
            <span className="pollutant">Озон (O3)</span>
            <span className="value">{o3} µg/m³</span>
          </div>
          <div>
            <span className="indicator">🟠</span>
            <span className="pollutant">Оксид серы (SO2)</span>
            <span className="value">{so2} µg/m³</span>
          </div>
          <div>
            <span className="indicator">🔴</span>
            <span className="pollutant">Частицы PM10</span>
            <span className="value">{pm10} µg/m³</span>
          </div>
          <div>
            <span className="indicator">🔴</span>
            <span className="pollutant">Частицы PM2.5</span>
            <span className="value">{pm2_5} µg/m³</span>
          </div>
        </div>
      </div>
    </div>
  );
};

AirQuality.propTypes = {
  airData: PropTypes.object,
};

export default AirQuality;