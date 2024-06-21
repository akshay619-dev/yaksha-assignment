const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');
const cors = require('cors');
const app = express();
const PORT = 3000;
// Enable CORS
app.use(cors());

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

const filterData = (data, make, duration) => {
  const now = new Date();
  const filterDate = (timestamp, duration) => {
    const date = new Date(timestamp);
    switch (duration) {
      case 'Last month':
        return date >= new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      case 'This month':
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      case 'Last 3 months':
        return date >= new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
      case 'Last 6 months':
        return date >= new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
      case 'This year':
        return date.getFullYear() === now.getFullYear();
      case 'Last year':
        return date.getFullYear() === now.getFullYear() - 1;
      default:
        return true;
    }
  };

  return data.filter(item => {
    const isMakeMatch = make ? item.brand.toLowerCase() === make.toLowerCase() : true;
    const isDateMatch = duration ? filterDate(item.timestamp, duration) : true;
    return isMakeMatch && isDateMatch;
  });
};

app.get('/api/inventory', async (req, res) => {
  try {
    const { make, duration } = req.query;
    const data = await parseCSV('data.csv');
    const filteredData = filterData(data, make, duration);
    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read or process CSV data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
