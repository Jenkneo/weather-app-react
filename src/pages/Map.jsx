import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getAirPollutionData } from '../services/airPollution'; // Импорт функции для получения данных

// Основной контейнер для карты
const StyledMapContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
  width: 100%;
  box-sizing: border-box;

  .leaflet-container {
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    position: relative;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .leaflet-container {
      padding-bottom: 75%;
    }
  }

  @media (max-width: 480px) {
    .leaflet-container {
      padding-bottom: 100%;
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
  const [pollutionData, setPollutionData] = useState([]);

  useEffect(() => {
    const fetchPollutionData = async () => {
      // Пример координат, вы можете заменить на свои
      const coordinates = [
        { lat: 55.751244, lon: 37.618423 }, // Москва
        { lat: 59.934280, lon: 30.335099 }, // Санкт-Петербург
        { lat: 54.738762, lon: 55.972414 }, // Уфа
        { lat: 69.3558, lon: 88.1883 },     // Норильск
        { lat: 46.0044, lon: 47.4801 },     // Астрахань
        { lat: 22.3193, lon: 114.1694 },    // Гонконг
        { lat: 28.6139, lon: 77.2090 },     // Нью-Дели
      ];
      
      const dataPromises = coordinates.map(async (coord) => {
        const data = await getAirPollutionData(coord.lat, coord.lon);
        return {
          lat: coord.lat,
          lon: coord.lon,
          aqi: data.list[0].main.aqi, // Уровень загрязнения
          components: data.list[0].components // Компоненты загрязнения
        };
      });

      const results = await Promise.all(dataPromises);
      setPollutionData(results);
    };

    fetchPollutionData();
  }, []);

  // Функция для выбора цвета на основе уровня загрязнения
  const getColor = (aqi) => {
    switch (aqi) {
      case 1: return 'green'; // Хорошо
      case 2: return 'yellow'; // Умеренно
      case 3: return 'orange'; // Плохо
      case 4: return 'red'; // Очень плохо
      case 5: return 'purple'; // Ужасно
      default: return 'gray'; // Неизвестно
    }
  };

  return (
    <StyledMapContainer>
      <h2 style={{ textAlign: 'center' }}>Карта загрязнения воздуха</h2>
      <MapContainer center={[55.751244, 37.618423]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {pollutionData.map((data, index) => (
          <Circle
            key={index}
            center={[data.lat, data.lon]}
            radius={100} // Радиус круга
            pathOptions={{ color: getColor(data.aqi) }}
          >
            <Marker position={[data.lat, data.lon]}>
              <Popup>
                <div>
                  <h4>Информация о загрязнении</h4>
                  <p>Координаты: {data.lat}, {data.lon}</p>
                  <p>AQI: {data.aqi}</p>
                  <p>CO: {data.components.co} µg/m³</p>
                  <p>NO2: {data.components.no2} µg/m³</p>
                  <p>O3: {data.components.o3} µg/m³</p>
                  <p>SO2: {data.components.so2} µg/m³</p>
                  <p>PM10: {data.components.pm10} µg/m³</p>
                  <p>PM2.5: {data.components.pm2_5} µg/m³</p>
                </div>
              </Popup>
            </Marker>
            {/* Отображение текста AQI на круге */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              {data.aqi}
            </div>
          </Circle>
        ))}
      </MapContainer>
    </StyledMapContainer>
  );
};

export default MapComponent;
