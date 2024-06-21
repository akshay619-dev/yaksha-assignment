import React from 'react';

const InventoryCount = ({ data }) => {
    const countByType = (type) => data.filter(car => car.condition.toLowerCase() === type.toLowerCase()).length;

    return (
        <div>
            <h2>Inventory Count</h2>
            <p>New Vehicles: {countByType('new')}</p>
            <p>Used Vehicles: {countByType('used')}</p>
            <p>CPO Vehicles: {countByType('cpo')}</p>
        </div>
    );
};

export default InventoryCount;
