import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #4caf50;
  padding: 10px;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const Footer = () => (
  <FooterContainer>
    <p>&copy; 2024 Информационная система мониторинга качества воздуха</p>
  </FooterContainer>
);

export default Footer;
