import React from 'react';
import styled from 'styled-components';

const PollutionContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
`;

const PollutionInfo = () => (
  <PollutionContainer>
    <h2>Информация о загрязнении</h2>
    <p>Детальная информация о загрязнении воздуха различными веществами.</p>
  </PollutionContainer>
);

export default PollutionInfo;
