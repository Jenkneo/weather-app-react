import React from 'react';
import styled from 'styled-components';

const SafeLevelsContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
`;

const SafeLevels = () => (
  <SafeLevelsContainer>
    <h2>Предельно допустимые концентрации</h2>
    <p>Информация о ПДК для людей с различными нарушениями здоровья.</p>
  </SafeLevelsContainer>
);

export default SafeLevels;
