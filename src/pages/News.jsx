import React from 'react';
import styled from 'styled-components';

const NewsContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
`;

const News = () => (
  <NewsContainer>
    <h2>Новости</h2>
    <p>Последние новости о состоянии воздуха и связанных событиях.</p>
  </NewsContainer>
);

export default News;
