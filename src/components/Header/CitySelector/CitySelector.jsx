import React, { useState, useEffect } from 'react';
import './CitySelector.css';
import citiesData from './cities.json';
import useGeolocation from '../../../hooks/useGeolocation';
import { setCityName } from '../../../services/geocoding';

const CitySelector = ({ isCitySelectorActive, closeCitySelector }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedCities, setSortedCities] = useState([]);
  const [initialPosition, setInitialPosition] = useState(null);
  const { } = useGeolocation(initialPosition); // eslint-disable-line

  useEffect(() => {
    const sorted = [...citiesData].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedCities(sorted);
  }, []);

  useEffect(() => {
    if (isCitySelectorActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCitySelectorActive]);

  const handleCityClick = (city) => {
    const coordinates = {
      "lon": city.lon,
      "lat": city.lat
    }

    setCityName(city.name);
    setInitialPosition(coordinates);
    closeCitySelector();
    window.location.reload();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCities = sortedCities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`mobile-nav ${isCitySelectorActive ? 'active' : ''}`}>
      <button className="close-menu" aria-label="Закрыть меню" onClick={closeCitySelector}>
        <i className="fas fa-times"></i>
      </button>
      <div className="city-list-container">
        <h1>Список городов:</h1>
        <input
          type="text"
          placeholder="Поиск города"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ul>
          {filteredCities.map((city, index) => (
            <li key={index} onClick={() => handleCityClick(city)}>
              {city.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CitySelector;
