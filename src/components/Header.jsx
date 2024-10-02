import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #4caf50;
  padding: 10px;
  text-align: center;
`;

const NavLinks = styled.nav`
  display: flex;
  justify-content: space-around;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => (
  <HeaderContainer>
    <h1>Мониторинг Качества Воздуха</h1>
    <NavLinks>
      <StyledLink to="/">Главная</StyledLink>
      <StyledLink to="/map">Карта</StyledLink>
      <StyledLink to="/pollution-info">Загрязнения</StyledLink>
      <StyledLink to="/forecast">Прогноз</StyledLink>
    </NavLinks>
  </HeaderContainer>
);

export default Header;
