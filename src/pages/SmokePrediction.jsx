import React from 'react';
import styled from 'styled-components';

const SmokePredictionContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
`;

const SmokePrediction = () => (
  <SmokePredictionContainer>
    <h2>Прогноз задымленности</h2>
    <p>Прогноз уровня задымленности на основе текущих данных о пожарах.</p>
  </SmokePredictionContainer>
);

export default SmokePrediction;
