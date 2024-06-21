import React from 'react';

const AverageMsrp = ({ data }) => {
    const averageByType = (type) => {
        const filtered = data.filter(car => car.condition.toLowerCase() === type.toLowerCase());
        const total = filtered.reduce((sum, car) => sum + parseFloat(car.price.replace(' USD', '')), 0);
        return filtered.length ? (total / filtered.length).toFixed(2) : 0;
    };

    return (
        <div>
            <h2>Average MSRP</h2>
            <p>New Vehicles: ${averageByType('new')}</p>
            <p>Used Vehicles: ${averageByType('used')}</p>
            <p>CPO Vehicles: ${averageByType('cpo')}</p>
        </div>
    );
};

export default AverageMsrp;
