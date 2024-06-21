import React , { useState , useEffect} from 'react'

import './App.css'
import { fetchData, processData } from './utils/dataService';
import Dashboard from './components/Dashboard';
import { Home } from './components/Home';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const rawData = await fetchData();
      const processed = processData(rawData);
      setData(processed);
    };
    getData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <>
     <Home data={data}/>
     {/* <Dashboard data={data} />   */}
    </>
  )
}

export default App
