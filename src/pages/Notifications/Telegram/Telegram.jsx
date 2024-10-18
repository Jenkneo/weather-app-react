import React from 'react';
import './Telegram.css';
import { getCache } from '../../../utils/cache';

const GEOLOCATION_KEY = 'geolocation';
const TELEGRAM_BOT_USERNAME = 'air_pollution_notifications_bot';
const TELEGRAM_URL = `https://t.me/${TELEGRAM_BOT_USERNAME}`;

const Telegram = () => {
  const redirectToTelegram = () => {
    const location = getCache(GEOLOCATION_KEY)
    const lon = String(location.lon).replace('.', '-');
    const lat = String(location.lat).replace('.', '-');
    const url = `${TELEGRAM_URL}?start=lon${lon}lat${lat}`

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="telegram-container">
      <p>Чтобы подписаться на уведомления, нажмите на кнопку ниже.</p>
      <button className="submit-button" onClick={redirectToTelegram}>
        <i class="fa-brands fa-telegram"></i>
        Подписаться
      </button>
    </div>
  );
};

export default Telegram;
