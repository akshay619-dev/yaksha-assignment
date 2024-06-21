import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData }  from '../app/store/dataSliceX';
import AvgMSRPChart from "./custom/AvgMSRPChart";
import Header from "./custom/Header";
import InventoryCountChart from "./custom/InventoryCountChart";
import RecentGathered from "./custom/RecentGathered";
import SubHeader from "./custom/SubHeder";
import HistoryLogs from './custom/HistoryLogs';
import MultiFilter from './MultiFilter';
import SideFilters from './custom/SideFilters';

const Home = ({data}) => {
  const dispatch = useDispatch();
  const { filteredData, status, error } = useSelector(state => state.data);
  const [avgChartFilter, setAvgChartFilter] = useState('new');
  const [inventoryChartFilter, setInventoryChartFilter] = useState('new');

  useEffect(() => {

    console.log(filteredData , status)

      dispatch(fetchData());
  }, [dispatch]);

  if (status === 'loading') {
      return <div>Loading...</div>;
  }

  if (status === 'failed') {
      return <div>Error: {error}</div>;
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <SubHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        
      <SideFilters />


      <RecentGathered  data={filteredData}/>


        {/* Inventory Count Chart */}
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

    
        <InventoryCountChart data={filteredData} filter={inventoryChartFilter} /> 

        {/* End Inventory Count Chart  */}
          


        
         {/* Start  Avg MSRP Count Chart */}  
        <div>
                <label>
                    <input type="radio" name="avgChartFilter" value="new" checked={avgChartFilter === 'new'} onChange={() => setAvgChartFilter('new')} />
                    New
                </label>
                <label>
                    <input type="radio" name="avgChartFilter" value="used" checked={avgChartFilter === 'used'} onChange={() => setAvgChartFilter('used')} />
                    Used
                </label>
                <label>
                    <input type="radio" name="avgChartFilter" value="cpo" checked={avgChartFilter === 'cpo'} onChange={() => setAvgChartFilter('cpo')} />
                    CPO
                </label>
            </div>

        <AvgMSRPChart  data={filteredData} filter={avgChartFilter}/>

         {/* ENd Avg MSRP Count Chart */}


        <HistoryLogs  data={filteredData}/>

      </main>
    </div>
  )
}



export { Home };
