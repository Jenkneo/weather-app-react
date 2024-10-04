import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Основной контейнер для карты
const StyledMapContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
  width: 100%;
  box-sizing: border-box; /* Чтобы padding корректно рассчитывался */

  .leaflet-container {
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* Соотношение сторон 16:9 */
    position: relative;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .leaflet-container {
      padding-bottom: 75%; /* Изменение соотношения сторон для планшетов */
    }
  }

  @media (max-width: 480px) {
    .leaflet-container {
      padding-bottom: 100%; /* Соотношение 1:1 для телефонов */
    }
  }
`;

// Настройка иконки для Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = () => {
  useEffect(() => {
    // Логика для загрузки данных о загрязнениях или пожарах с API
  }, []);

  return (
    <StyledMapContainer>
      <h2 style={{ textAlign: 'center' }}>Карта</h2>
      <MapContainer center={[55.751244, 37.618423]} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[55.751244, 37.618423]}>
          <Popup>
            Загрязнение воздуха в Москве: уровень высокий.
          </Popup>
        </Marker>
      </MapContainer>
    </StyledMapContainer>
  );
};

export default MapComponent;
