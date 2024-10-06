import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import { getCityName } from '../../services/geocoding';
import './Header.css';

const Header = () => {
  const { position } = useGeolocation();
  const [city, setCity] = useState('Определение...');

  useEffect(() => {
    const fetchCity = async () => {
      if (position.lat && position.lon) {
        const cityName = await getCityName(position.lat, position.lon);
        setCity(cityName);
      }
    };

    fetchCity();
  }, [position]);

  return (
    <header className="header-container">
      {/* Текст с названием города */}
      <div className="city-text">{city}</div>

      {/* Вкладки навигации */}
      <nav className="nav-links">
        <NavLink exact to="/" activeClassName="active" className="nav-link">
          Главная
        </NavLink>
        <NavLink to="/forecast" activeClassName="active" className="nav-link">
          Прогноз на 10 дней
        </NavLink>
        <NavLink to="/map" activeClassName="active" className="nav-link">
          Карта Загрязнения
        </NavLink>
      </nav>

      {/* Поле поиска */}
      <input type="text" className="search-input" placeholder="Поиск по городам..." />
    </header>
  );
};

export default Header;
