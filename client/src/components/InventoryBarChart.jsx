import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryBarChart = ({ data, filter }) => {
    const filterDataByCondition = (data, condition) => {
        return data.filter(item => item.condition.toLowerCase() === condition.toLowerCase());
    };

    const calculateCountByDate = (filteredData) => {
        const groupedData = filteredData.reduce((acc, item) => {
            const date = item.timestamp.split(' ')[0]; // Get date part only
            if (!acc[date]) acc[date] = [];
            acc[date].push(item);
            return acc;
        }, {});

        const labels = Object.keys(groupedData).sort();
        const dataPoints = labels.map(date => groupedData[date].length);

        return { labels, dataPoints };
    };

    const filteredData = filter ? filterDataByCondition(data, filter) : data;
    const { labels, dataPoints } = calculateCountByDate(filteredData);

    const chartData = {
        labels,
        datasets: [
            {
                label: `Inventory Count (${filter})`,
                data: dataPoints,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Bar data={chartData} options={{ responsive: true }} />
        </div>
    );
};

export default InventoryBarChart;
