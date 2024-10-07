import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import useGeolocation from '../../hooks/useGeolocation';
import { getCityName } from '../../services/geocoding';

const Header = () => {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  const { position } = useGeolocation();
  const [city, setCity] = useState('Определение...');

  // Обработчик открытия/закрытия мобильного меню
  const toggleMobileNav = () => {
    setIsMobileNavActive(!isMobileNavActive);
  };

  // Обработчик закрытия мобильного меню
  const closeMobileNav = () => {
    setIsMobileNavActive(false);
  };

  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setIsMobileNavActive(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Очистка обработчика при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      if (position.lat && position.lon) {
        const cityName = await getCityName(position.lat, position.lon);
        setCity(cityName);
      }
    };

    fetchCity();
  }, [position]);

  // Обработчик кнопки геолокации
  const handleGeolocation = () => {
    alert('Пока что ручной ввод города не поддерживается...');
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <NavLink activeClassName="active" className="nav-link" to="/">
              <i className="fa-solid fa-cloud"></i>
            </NavLink>
          </div>
          <div className="location">
            <button
              id="geolocation-btn"
              aria-label="Определить местоположение"
              onClick={handleGeolocation}
            >
              <i className="fas fa-map-marker-alt"></i>
            </button>
            <span className="city-name">{city}</span>
          </div>
          <nav className="nav">
            <ul className="nav-list">
              <li>
                <NavLink activeClassName="active" className="nav-link" to="/forecast">Прогноз</NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" className="nav-link" to="/map">Карта</NavLink>
              </li>
              {/* <li>
                <NavLink activeClassName="active" className="nav-link" to="/news">Новости</NavLink>
              </li> */}
              <li>
                <NavLink activeClassName="active" className="nav-link" to="/notifications">Уведомления</NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" className="nav-link" to="/safe-levels">Нормы</NavLink>
              </li>
            </ul>
          </nav>
          <div
            className="menu-toggle"
            id="mobile-menu"
            aria-label="Открыть меню"
            onClick={toggleMobileNav}
          >
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </header>

      <nav className={`mobile-nav ${isMobileNavActive ? 'active' : ''}`}>
        <button className="close-menu" aria-label="Закрыть меню" onClick={closeMobileNav}>
          <i className="fas fa-times"></i>
        </button>
        <ul className="nav-list">
        <li>
            <NavLink activeClassName="active" onClick={closeMobileNav} className="nav-link" to="/">Главная</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" onClick={closeMobileNav} className="nav-link" to="/forecast">Прогноз</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" onClick={closeMobileNav} className="nav-link" to="/map">Карта</NavLink>
          </li>
          {/* <li>
            <NavLink activeClassName="active" onClick={closeMobileNav} className="nav-link" to="/news">Новости</NavLink>
          </li> */}
          <li>
            <NavLink activeClassName="active" onClick={closeMobileNav} className="nav-link" to="/notifications">Уведомления</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" onClick={closeMobileNav} className="nav-link" to="/safe-levels">Нормы</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
