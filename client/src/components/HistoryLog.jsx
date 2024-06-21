import React from 'react';
import DataTable from 'react-data-table-component';
const HistoryLog = ({ data }) => {
    const calculateStats = (type) => {
        const filtered = data.filter(car => car.condition.toLowerCase() === type.toLowerCase());
        const count = filtered.length;
        const totalMsrp = filtered.reduce((sum, car) => sum + parseFloat(car.price.replace(' USD', '')), 0);
        const avgMsrp = count ? (totalMsrp / count).toFixed(2) : 0;
        return { count, totalMsrp: totalMsrp.toFixed(2), avgMsrp };
    };

    const newStats = calculateStats('new');
    const usedStats = calculateStats('used');
    const cpoStats = calculateStats('cpo');

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
    ];
    
    const dataX = [
          {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]

    return (
        
        <div>
            <h2>History Log</h2>
            <h3>New Inventory</h3>
            <p>Count: {newStats.count}</p>
            <p>Total MSRP: ${newStats.totalMsrp}</p>
            <p>Avg MSRP: ${newStats.avgMsrp}</p>

            <h3>Used Inventory</h3>
            <p>Count: {usedStats.count}</p>
            <p>Total MSRP: ${usedStats.totalMsrp}</p>
            <p>Avg MSRP: ${usedStats.avgMsrp}</p>

            <h3>CPO Inventory</h3>
            <p>Count: {cpoStats.count}</p>
            <p>Total MSRP: ${cpoStats.totalMsrp}</p>
            <p>Avg MSRP: ${cpoStats.avgMsrp}</p>

            <DataTable
			columns={columns}
			data={dataX}
            pagination
		/>
        </div>
    );
};

export default HistoryLog;
