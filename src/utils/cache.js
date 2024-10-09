/**
 * Сохраняет данные в LocalStorage.
 * @param {string} key - Ключ для хранения данных.
 * @param {any} data - Данные для сохранения.
 */
export const setCache = (key, data) => {
  try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
  } catch (error) {
      console.error("Ошибка при сохранении в LocalStorage:", error);
  }
};

/**
* Получает данные из LocalStorage.
* @param {string} key - Ключ для получения данных.
* @returns {any} - Возвращает данные или null, если ключ не найден.
*/
export const getCache = (key) => {
  try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) return null;
      return JSON.parse(serializedData);
  } catch (error) {
      console.error("Ошибка при получении данных из LocalStorage:", error);
      return null;
  }
};

/**
* Удаляет данные из LocalStorage.
* @param {string} key - Ключ для удаления данных.
*/
export const removeCache = (key) => {
  try {
      localStorage.removeItem(key);
  } catch (error) {
      console.error("Ошибка при удалении данных из LocalStorage:", error);
  }
};
