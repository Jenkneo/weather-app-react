// airQualityRecommendations.js

export const getHealthRecommendations = (aqi) => {
    switch (aqi) {
      case 1:
        return "Качество воздуха хорошо. Можно заниматься активными делами на улице.";
      case 2:
        return "Умеренное загрязнение. Для людей с повышенной чувствительностью могут быть проблемы.";
      case 3:
        return "Загрязнение вредно для групп с повышенной чувствительностью.";
      case 4:
        return "Высокое загрязнение. Возможно влияние на здоровье людей.";
      case 5:
        return "Качество воздуха крайне плохое. Нужно избегать длительного пребывания на улице.";
      default:
        return "Нет данных о качестве воздуха.";
    }
  };
  
  export const getColor = (aqi) => {
    switch (aqi) {
      case 1: return 'green';
      case 2: return 'yellow';
      case 3: return 'orange';
      case 4: return 'red';
      case 5: return 'purple';
      default: return 'gray';
    }
  };
  
  export const airQualityOptions = [
    { value: "1", label: "1 (Хорошо)" },
    { value: "2", label: "2 (Умеренно)" },
    { value: "3", label: "3 (Плохо для чувствительных групп)" },
    { value: "4", label: "4 (Плохо)" },
    { value: "5", label: "5 (Очень плохо)" },
  ];
  