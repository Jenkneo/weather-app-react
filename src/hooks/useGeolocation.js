import { useState, useEffect } from 'react';
import { setCache, getCache } from '../utils/cache';

const useGeolocation = (initialPosition = null) => {
  const [position, setPosition] = useState(initialPosition || { lat: null, lon: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedPosition = getCache('geolocation');
    if (cachedPosition) {
      setPosition(cachedPosition);
    } else {
      if (!navigator.geolocation) {
        setError('Геолокация не поддерживается вашим браузером');
        return;
      }

      const success = (pos) => {
        const newPosition = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setPosition(newPosition);
        setCache('geolocation', newPosition);
      };

      const failure = (err) => {
        setError(err.message);
      };

      navigator.geolocation.getCurrentPosition(success, failure);
    }
  }, []);

  useEffect(() => {
    if (initialPosition) {
      setCache('geolocation', initialPosition);
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  return { position, error };
};

export default useGeolocation;
