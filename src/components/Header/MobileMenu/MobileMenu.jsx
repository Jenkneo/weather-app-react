import React from 'react';
import { NavLink } from 'react-router-dom';
import './MobileMenu.css';

const MobileNav = ({ isMobileNavActive, closeMobileNav }) => {
  return (
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
        <li>
          <NavLink activeClassName="active" onClick={closeMobileNav} className="nav-link" to="/notifications">Уведомления</NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" onClick={closeMobileNav} className="nav-link" to="/safe-levels">Нормы</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
