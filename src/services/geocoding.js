const GEOCODING_API_KEY = 'f1ea1814ac5b4e5ab566d9c53b1a501a';

export const getCityName = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${GEOCODING_API_KEY}&language=ru&pretty=1`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const components = data.results[0].components;
      return components.city || components.town || components.village || 'Неизвестный город';
    } else {
      return 'Неизвестный город';
    }
  } catch (error) {
    console.error('Ошибка при обратном геокодировании:', error);
    return 'Неизвестный город';
  }
};
