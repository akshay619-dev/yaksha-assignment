import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { DollarSign } from 'lucide-react';

const RecentGathered = ({ data }) => {

    if (!data.length) return <p>No recent data available.</p>;

    const calculateStats = (filteredData) => {
        const totalMsrp = filteredData.reduce((sum, item) => sum + parseFloat(item.price.replace(' USD', '')), 0);
        const count = filteredData.length;
        const avgMsrp = count ? (totalMsrp / count) : 0;
        return { count, totalMsrp, avgMsrp };
    };

    const newStats = calculateStats(data.filter(item => item.condition.toLowerCase() === 'new'));
    const usedStats = calculateStats(data.filter(item => item.condition.toLowerCase() === 'used'));
    const cpoStats = calculateStats(data.filter(item => item.condition.toLowerCase() === 'cpo'));



    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-8">
            <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">

                    </CardTitle>

                </CardHeader>
                <CardContent>
                    <div className="text-l font-bold">{newStats.count}</div>
                    <p className="text-xs text-muted-foreground">
                        # New Units
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">

                    </CardTitle>

                </CardHeader>
                <CardContent>
                    <div className="text-l font-bold">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {newStats.totalMsrp.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                        # New MSRP
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                </CardHeader>
                <CardContent>
                    <div className="text-l font-bold"><DollarSign className="h-4 w-4 text-muted-foreground" />
                        {newStats.avgMsrp.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                        # New Avg. MSRP
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                </CardHeader>
                <CardContent>
                    <div className="text-l font-bold">{usedStats.count}</div>
                    <p className="text-xs text-muted-foreground">
                        # Used Units
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                </CardHeader>
                <CardContent>
                    <div className="text-l font-bold">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {usedStats.totalMsrp.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                        # Used MSRP
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                </CardHeader>
                <CardContent>
                    <div className="text-l font-bold"><DollarSign className="h-4 w-4 text-muted-foreground" />
                        {usedStats.avgMsrp.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                        # Used Avg. MSRP
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                </CardHeader>
                <CardContent>
                    <div className="text-l font-bold">{cpoStats.count}</div>
                    <p className="text-xs text-muted-foreground">
                        # CPO Units
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                </CardHeader>
                <CardContent>
                    <div className="text-l font-bold"><DollarSign className="h-4 w-4 text-muted-foreground" />
                        {cpoStats.totalMsrp.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                        # CPO MSRP
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                </CardHeader>
                <CardContent>
                    <div className="text-l font-bold"><DollarSign className="h-4 w-4 text-muted-foreground" />
                        {cpoStats.avgMsrp.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                        # CPO Avg MSRP
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default RecentGathered