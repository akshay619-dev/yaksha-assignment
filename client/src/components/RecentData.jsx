import React from 'react';

const RecentData = ({ data }) => {
    if (!data.length) return <p>No recent data available.</p>;

    const recent = data.reduce((latest, item) =>
        new Date(item.timestamp) > new Date(latest.timestamp) ? item : latest
    );

    return (
        <div>
            <h2>Recent Data</h2>
            <p>{recent.title}</p>
        </div>
    );
};

export default RecentData;
