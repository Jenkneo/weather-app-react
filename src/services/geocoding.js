import { getCache, setCache } from '../utils/cache';
const GEOCODING_API_KEY = 'f1ea1814ac5b4e5ab566d9c53b1a501a';
const isDevMode = process.env.NODE_ENV === 'development';
const BASE_URL = (isDevMode ? 'http' : 'https') + `://api.opencagedata.com/geocode/v1`;

/**
 * Получает название города по координатам.
 * @param {number} lat - Широта.
 * @param {number} lon - Долгота.
 * @returns {Promise<string>} - Название города или значение по умолчанию.
 */
export const fetchCityName = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/json?q=${lat}+${lon}&key=${GEOCODING_API_KEY}&language=ru&pretty=1`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const components = data.results[0].components;
      return components.city || components.town || components.village || 'Неизвестный город';
    }
    return null; // Если результаты не найдены
  } catch (error) {
    console.error("Ошибка при получении данных о городе:", error);
    return null; // В случае ошибки возвращаем null
  }
};

/**
 * Устанавливает значение города в LocalStorage.
 * @param {string} cityName - Название города.
 */
export const setCityName = (cityName) => {
  const cacheKey = 'client_city';
  if (cityName) {
    setCache(cacheKey, cityName);
  } else {
    const defaultCityName = "Астрахань";
    console.warn(`Не удалось получить данные о городе. Установлено значение ${defaultCityName} по умолчанию.`);
    setCache(cacheKey, defaultCityName);
  }
};

/**
 * Основная функция для получения имени города и его кэширования.
 * @param {number} lat - Широта.
 * @param {number} lon - Долгота.
 * @returns {Promise<string>} - Название города.
 */
export const getCityName = async (lat, lon) => {
  const cacheKey = 'client_city';
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const cityName = await fetchCityName(lat, lon);
  setCityName(cityName);
  return cityName || "Астрахань"; // Возвращаем значение по умолчанию, если ничего не нашли
};
