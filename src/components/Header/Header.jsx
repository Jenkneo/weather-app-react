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
      <div className="city-text">{city}</div>

      <nav className="nav-links">
        <NavLink activeClassName="active" className="nav-link" exact to="/">Главная</NavLink>
        <NavLink activeClassName="active" className="nav-link" to="/forecast">Прогноз на 10 дней</NavLink>
        <NavLink activeClassName="active" className="nav-link" to="/map">Карта Загрязнения</NavLink>
      </nav>

      <input type="text" className="search-input" placeholder="Поиск по городам..." />
    </header>
  );
};

export default Header;
