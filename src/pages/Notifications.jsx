import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationsContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
`;

const NotificationForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Label = styled.label`
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  margin-left: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 1.1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const Notifications = () => {
  const [aqiThreshold, setAqiThreshold] = useState(3); // Порог AQI для уведомлений
  const [enableNotifications, setEnableNotifications] = useState(true); // Включены ли уведомления
  const [, setIsFormSubmitted] = useState(false); // Проверка на отправку формы

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    setIsFormSubmitted(true); // Отмечаем, что форма отправлена

    // Всплывающее уведомление при сохранении настроек
    if (enableNotifications) {
      toast.success(`Уведомления включены для AQI порога: ${aqiThreshold}. Статус: Включены`);
    } else {
      toast.info(`Уведомления выключены для AQI порога: ${aqiThreshold}. Статус: Выключены`);
    }
  };

  return (
    <NotificationsContainer>
      <Title>Уведомления</Title>
      <p>Настройте уведомления о состоянии воздуха в вашем регионе.</p>
      <NotificationForm onSubmit={handleFormSubmit}>
        <Label htmlFor="aqi-threshold">Выберите порог AQI для уведомлений:</Label>
        <Select
          id="aqi-threshold"
          value={aqiThreshold}
          onChange={(e) => setAqiThreshold(e.target.value)}
        >
          <option value="1">1 (Хорошо)</option>
          <option value="2">2 (Умеренно)</option>
          <option value="3">3 (Плохо для чувствительных групп)</option>
          <option value="4">4 (Плохо)</option>
          <option value="5">5 (Очень плохо)</option>
        </Select>

        <CheckboxContainer>
          <input
            type="checkbox"
            id="enable-notifications"
            checked={enableNotifications}
            onChange={(e) => setEnableNotifications(e.target.checked)} // Следим за изменением состояния
          />
          <CheckboxLabel htmlFor="enable-notifications">
            Включить уведомления
          </CheckboxLabel>
        </CheckboxContainer>

        <SubmitButton type="submit">Сохранить настройки</SubmitButton>
      </NotificationForm>

      {/* Компонент для вывода всплывающих уведомлений */}
      <ToastContainer
        position="top-center" // Изменяем позицию уведомлений наверх
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </NotificationsContainer>
  );
};

export default Notifications;
