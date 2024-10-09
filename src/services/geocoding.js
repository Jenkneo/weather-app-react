import { getCache, setCache } from '../utils/cache';
const GEOCODING_API_KEY = 'f1ea1814ac5b4e5ab566d9c53b1a501a';

// Нужно сделать, чтобы эта хуйня обращалась на бек
export const getCityName = async (lat, lon) => {
  const cacheKey = `client_city`;
  const cachedData = getCache(cacheKey);

  function cityNameByDefault() {
    const cityName = "Астрахань"
    console.warn(`Не удалось получить данные о городе. Установлено значение ${cityName} по умолчанию.`);
    setCache(cacheKey, cityName);
    return cityName
  }

  if (cachedData) {
      return cachedData;
  }

  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${GEOCODING_API_KEY}&language=ru&pretty=1`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const components = data.results[0].components;
      const cityName = components.city || components.town || components.village || 'Неизвестный город';
      setCache(cacheKey, cityName);
      return cityName
    } else {
      return cityNameByDefault()
    }
  } catch (error) {
      return cityNameByDefault()
  }
};