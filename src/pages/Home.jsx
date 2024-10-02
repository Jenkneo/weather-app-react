import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px; /* Для избежания перекрытия футером */
`;

const Home = () => (
  <HomeContainer>
    <h2>Добро пожаловать в систему мониторинга качества воздуха</h2>
    <p>Здесь вы можете узнать актуальную информацию о состоянии воздуха в вашем городе.</p>
  </HomeContainer>
);

export default Home;
