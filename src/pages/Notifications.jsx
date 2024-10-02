import React from 'react';
import styled from 'styled-components';

const NotificationsContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
`;

const Notifications = () => (
  <NotificationsContainer>
    <h2>Уведомления</h2>
    <p>Настройте уведомления о состоянии воздуха в вашем регионе.</p>
  </NotificationsContainer>
);

export default Notifications;
