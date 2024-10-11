import React, { useState, useEffect } from 'react';
import './CitySelector.css';
import citiesData from './cities.json';

const CitySelector = ({ isCitySelectorActive, closeCitySelector }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedCities, setSortedCities] = useState([]);

  useEffect(() => {
    const sorted = [...citiesData].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedCities(sorted);
  }, []);

  useEffect(() => {
    if (isCitySelectorActive) {
      // Отключаем прокрутку заднего фона
      document.body.style.overflow = 'hidden';
    } else {
      // Включаем прокрутку заднего фона
      document.body.style.overflow = 'auto';
    }

    // Очистка эффекта при размонтировании компонента
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCitySelectorActive]);

  const handleCityClick = (city) => {
    alert(`Вы выбрали город ${city.name}. Широта ${city.lat}. Долгота ${city.lon}`);
    closeCitySelector();
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
