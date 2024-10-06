import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


const Header = () => (
  <div className="header-container">
    <h1>Мониторинг Качества Воздуха</h1>
    <div className="nav-links">
      <Link className='link' to="/">Главная</Link>
      <Link className='link' to="/map">Карта</Link>
      <Link className='link' to="/pollution-info">Загрязнения</Link>
      <Link className='link' to="/forecast">Прогноз</Link>
    </div>
  </div>
);

export default Header;
