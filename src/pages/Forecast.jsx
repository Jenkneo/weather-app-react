import React from 'react';
import styled from 'styled-components';

const ForecastContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
`;

const Forecast = () => (
  <ForecastContainer>
    <h2>Прогноз загрязнения</h2>
    <p>Прогноз состояния воздуха на ближайшие 7 дней.</p>
  </ForecastContainer>
);

export default Forecast;
