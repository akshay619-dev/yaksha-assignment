import React from 'react';
import moment from 'moment';
import DataTable from 'react-data-table-component';
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
const HistoryLogs = ({ data }) => {
    const groupByDate = (data) => {
        const groupedData = {};

        data.forEach(item => {
            const date = moment(item.timestamp).format('YYYY-MM-DD');
            if (!groupedData[date]) {
                groupedData[date] = [];
            }
            groupedData[date].push(item);
        });

        return groupedData;
    };

    const calculateStats = (items, condition) => {
        const filtered = items.filter(car => car.condition.toLowerCase() === condition.toLowerCase());
        const count = filtered.length;
        const totalMsrp = filtered.reduce((sum, car) => sum + parseFloat(car.price.replace(' USD', '')), 0);
        const avgMsrp = count ? (totalMsrp / count).toFixed(2) : 0;
        return { count, totalMsrp: totalMsrp.toFixed(2), avgMsrp };
    };


    const columns = [
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'New Inventory',
            selector: row => row.new_count,
            sortable: true,
        }, 
        {
            name: 'New Total Inventory',
            selector: row => row.new_totalMsrp,
            sortable: true,
        }, 
        {
            name: 'New Avg Inventory',
            selector: row => row.new_avgMsrp,
            sortable: true,
        },
        {
            name: 'Used Inventory',
            selector: row => row.used_count,
            sortable: true,
        }, 
        {
            name: 'Used Total MSRP',
            selector: row => row.used_totalMsrp,
            sortable: true,
        }, 
        {
            name: 'Used Avg MSRP',
            selector: row => row.used_avgMsrp,
            sortable: true,
        },
        {
            name: 'CPO Inventory',
            selector: row => row.cpo_count,
            sortable: true,
        }, 
        {
            name: 'CPO Total MSRP',
            selector: row => row.cpo_totalMsrp,
            sortable: true,
        }, 
        {
            name: 'CPO Avg MSRP',
            selector: row => row.cpo_avgMsrp,
            sortable: true,
        }
    ];

    const transformData = (groupedData) => {
        const calculateStats = (items, condition) => {
            const filtered = items.filter(car => car.condition.toLowerCase() === condition.toLowerCase());
            const count = filtered.length;
            const totalMsrp = filtered.reduce((sum, car) => sum + parseFloat(car.price.replace(' USD', '')), 0);
            const avgMsrp = count ? (totalMsrp / count).toFixed(2) : 0;
            return { count, totalMsrp: totalMsrp.toFixed(2), avgMsrp };
        };
    
        return Object.keys(groupedData).map(date => {
            const newStats = calculateStats(groupedData[date], 'new');
            const usedStats = calculateStats(groupedData[date], 'used');
            const cpoStats = calculateStats(groupedData[date], 'cpo');
            return {
                date,
                new_count: newStats.count,
                new_totalMsrp: newStats.totalMsrp,
                new_avgMsrp: newStats.avgMsrp,
                used_count: usedStats.count,
                used_totalMsrp: usedStats.totalMsrp,
                used_avgMsrp: usedStats.avgMsrp,
                cpo_count: cpoStats.count,
                cpo_totalMsrp: cpoStats.totalMsrp,
                cpo_avgMsrp: cpoStats.avgMsrp
            };
        });
    };

    const groupedData = groupByDate(data);
    const transformedData = transformData(groupedData);


  return (
   <>
      <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items  -center">
              <div className="grid gap-2">
                <CardTitle>History Logs</CardTitle>

        
                

              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <a href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </CardHeader>
            <CardContent>
            <DataTable
			columns={columns}
			data={transformedData}
            pagination
		/>
            </CardContent>
        </Card>
   </>
  )
}

export default HistoryLogs