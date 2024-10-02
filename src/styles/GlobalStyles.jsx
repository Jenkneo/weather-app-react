import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #f5f5f5;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #333;
  }

  p {
    color: #555;
  }

  /* Мобильная адаптивность */
  @media (max-width: 768px) {
    /* Ваши стили для мобильных устройств */
  }
`;

export default GlobalStyles;
