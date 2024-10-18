import React from 'react';
import './Notifications.css';
import Telegram from './Telegram/Telegram';

const Notifications = () => {
  return (
    <div className="notifications-container">
      <h2 className="notifications-title">Уведомления</h2>
      <p>Получать уведомления возможно пока только через Telegram.</p>
      <Telegram />
    </div>
  );
};

export default Notifications;
