import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #fff; /* Фон белый */
  padding: 20px;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #ccc; /* Добавляем разделение от основной страницы */
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* Легкая тень для разделения */

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 14px;
  }
`;

const FooterText = styled.p`
  color: black; /* Текст черного цвета */
  font-size: 16px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Footer = () => (
  <FooterContainer>
    <FooterText>&copy; 2024 Информационная система мониторинга качества воздуха</FooterText>
  </FooterContainer>
);

export default Footer;
