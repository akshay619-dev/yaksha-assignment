import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data, filter }) => {
    const filterDataByCondition = (data, condition) => {
        return data.filter(item => item.condition.toLowerCase() === condition.toLowerCase());
    };

    const calculateAverageMsrpByDate = (filteredData) => {
        const groupedData = filteredData.reduce((acc, item) => {
            const date = item.timestamp.split(' ')[0]; // Get date part only
            if (!acc[date]) acc[date] = [];
            acc[date].push(parseFloat(item.price.replace(' USD', '')));
            return acc;
        }, {});

        const labels = Object.keys(groupedData).sort();
        const dataPoints = labels.map(date => {
            const msrpList = groupedData[date];
            const avgMsrp = msrpList.reduce((sum, price) => sum + price, 0) / msrpList.length;
            return avgMsrp;
        });

        return { labels, dataPoints };
    };

    const filteredData = filter ? filterDataByCondition(data, filter) : data;
    const { labels, dataPoints } = calculateAverageMsrpByDate(filteredData);

    const chartData = {
        labels,
        datasets: [
            {
                label: `Average MSRP (${filter})`,
                data: dataPoints,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div>
            <h2>Average MSRP Over Time</h2>
            <Line data={chartData} options={{ responsive: true }} />
        </div>
    );
};

export default LineChart;
