const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const moment = require('moment');

const app = express();
const port = 3000;

// Function to read and parse CSV file
const readCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
};

// Function to filter data based on query parameters
const filterData = (data, make, duration) => {
    let filteredData = data;

    if (make) {
        filteredData = filteredData.filter(car => car.brand.toLowerCase() === make.toLowerCase());
    }

    if (duration) {
        const now = moment();
        let startDate;
        switch (duration.toLowerCase()) {
            case 'last month':
                startDate = moment().subtract(1, 'months').startOf('month');
                break;
            case 'this month':
                startDate = moment().startOf('month');
                break;
            case 'last 3 months':
                startDate = moment().subtract(3, 'months').startOf('month');
                break;
            case 'last 6 months':
                startDate = moment().subtract(6, 'months').startOf('month');
                break;
            case 'this year':
                startDate = moment().startOf('year');
                break;
            case 'last year':
                startDate = moment().subtract(1, 'years').startOf('year');
                break;
            default:
                startDate = moment(0); // if no match, return all
        }
        filteredData = filteredData.filter(car => moment(car.timestamp).isAfter(startDate));
    }

    return filteredData;
};

// Define a GET route with filtering
app.get('/api/inventory', async (req, res) => {
    try {
        const { make, duration } = req.query;
        const filePath = path.join(__dirname, 'data.csv'); // Adjust the path to your CSV file
        const data = await readCSV(filePath);
        const filteredData = filterData(data, make, duration);
        res.json(filteredData);
    } catch (error) {
        res.status(500).send('Error reading CSV file');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
