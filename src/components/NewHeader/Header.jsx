import React, { useState, useEffect } from 'react';
import './Header.css';
import useGeolocation from '../../hooks/useGeolocation';
import { getCityName } from '../../services/geocoding';

const AirQualityMonitor = () => {
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
            <a href="#home" aria-label="Главная страница">
              <i className="fa-solid fa-cloud"></i>
            </a>
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
                <a href="#forecast">Прогноз</a>
              </li>
              <li>
                <a href="#map">Карта</a>
              </li>
              <li>
              <a href="#forecast">Новости</a>
              </li>
              <li>
              <a href="#notifications">Уведомления</a>
              </li>
              <li>
                <a href="#safelevels">Нормы</a>
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
            <a href="#forecast" className="nav-link" onClick={closeMobileNav }>
              Прогноз
            </a>
          </li>
          <li>
            <a href="#map" className="nav-link" onClick={closeMobileNav }>
              Карта
            </a>
          </li>
          <li>
            <a href="#news" className="nav-link" onClick={closeMobileNav }>
              Новости
            </a>
          </li>
          <li>
            <a href="#notifications" className="nav-link" onClick={closeMobileNav }>
              Уведомления
            </a>
          </li>
          <li>
            <a href="#safelevels" className="nav-link" onClick={closeMobileNav }>
              Нормы
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AirQualityMonitor;
