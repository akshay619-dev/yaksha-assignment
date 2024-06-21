import React ,{useState}from 'react'
import { Bar } from 'react-chartjs-2';
import {
    ArrowUpRight
  } from "lucide-react";
  
  
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
  } from "@/components/ui/card";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const InventoryCountChart = ({ data, filter }) => {
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
    <>
        
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items  -center">
              <div className="grid gap-2">
                <CardTitle>Inventory Count</CardTitle>

        
                

              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <a href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </CardHeader>
            <CardContent>

           
            <Bar data={chartData} options={{ responsive: true }} />

            </CardContent>
          </Card>

    
    </>
  )
}

export default InventoryCountChart