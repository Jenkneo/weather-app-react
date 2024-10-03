import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [position, setPosition] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается вашим браузером');
      return;
    }

    const success = (pos) => {
      setPosition({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    };

    const failure = (err) => {
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(success, failure);
  }, []);

  return { position, error };
};

export default useGeolocation;
