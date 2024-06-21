import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/inventory');
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

export const processData = (data) => {
  const processedData = {
    recentData: data.slice(-1)[0],
    inventoryCount: {
      new: data.filter(car => car.condition === 'new').length,
      used: data.filter(car => car.condition === 'used').length,
      cpo: data.filter(car => car.condition === 'cpo').length,
    },
    averageMSRP: {
      new: calculateAverageMSRP(data.filter(car => car.condition === 'new')),
      used: calculateAverageMSRP(data.filter(car => car.condition === 'used')),
      cpo: calculateAverageMSRP(data.filter(car => car.condition === 'cpo')),
    },
    historyLog: data,
  };

  return processedData;
};

const calculateAverageMSRP = (vehicles) => {
  if (vehicles.length === 0) return 0;
  const totalMSRP = vehicles.reduce((acc, car) => acc + parseFloat(car.price.replace(' USD', '')), 0);
  return (totalMSRP / vehicles.length).toFixed(2);
};
