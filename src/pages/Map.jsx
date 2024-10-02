import React from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
`;

const Map = () => (
  <MapContainer>
    <h2>Карта</h2>
    <p>Здесь будет отображаться карта пожаров, загрязнений воздуха и других событий.</p>
  </MapContainer>
);

export default Map;
