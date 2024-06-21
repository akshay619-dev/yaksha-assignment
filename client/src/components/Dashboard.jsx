import React, { useEffect ,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setMake, setDuration } from '../app/store/dataSlice';
import RecentData from './RecentData';
import InventoryCount from './InventoryCount';
import AverageMsrp from './AverageMSRP';
import HistoryLog from './HistoryLog';
import Filters from './Filters';
import HistoryListLog from './HistoryListLogs';
import LineChart from './LineChart';
import BarChart from './Barchar';
import InventoryBarChart from './InventoryBarChart';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { filteredData, status, error } = useSelector(state => state.data);
    const [chartFilter, setChartFilter] = useState('new');

    const [inventoryChartFilter, setInventoryChartFilter] = useState('new');

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Filters setMake={(make) => dispatch(setMake(make))} setDuration={(duration) => dispatch(setDuration(duration))} />
            <RecentData data={filteredData} />
            <InventoryCount data={filteredData} />
            <AverageMsrp data={filteredData} />
            {/* <HistoryLog data={filteredData} /> */}
            <HistoryListLog data={filteredData}/>


            <div>
                <label>
                    <input type="radio" name="chartFilter" value="new" checked={chartFilter === 'new'} onChange={() => setChartFilter('new')} />
                    New
                </label>
                <label>
                    <input type="radio" name="chartFilter" value="used" checked={chartFilter === 'used'} onChange={() => setChartFilter('used')} />
                    Used
                </label>
                <label>
                    <input type="radio" name="chartFilter" value="cpo" checked={chartFilter === 'cpo'} onChange={() => setChartFilter('cpo')} />
                    CPO
                </label>
            </div>
            {/* <LineChart data={filteredData} filter={chartFilter} /> */}
            <BarChart data={filteredData} filter={chartFilter} />
            <div>Inventory counts </div>


            <div>
                <label>
                    <input type="radio" name="inventoryChartFilter" value="new" checked={inventoryChartFilter === 'new'} onChange={() => setInventoryChartFilter('new')} />
                    New
                </label>
                <label>
                    <input type="radio" name="inventoryChartFilter" value="used" checked={inventoryChartFilter === 'used'} onChange={() => setInventoryChartFilter('used')} />
                    Used
                </label>
                <label>
                    <input type="radio" name="inventoryChartFilter" value="cpo" checked={inventoryChartFilter === 'cpo'} onChange={() => setInventoryChartFilter('cpo')} />
                    CPO
                </label>
            </div>
            <InventoryBarChart data={filteredData} filter={inventoryChartFilter} />



        </div>
    );
};

export default Dashboard;
