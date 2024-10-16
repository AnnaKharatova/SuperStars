import { Route, Routes } from "react-router";
import {useState} from 'react';
import MainPage from "../MainPage/MainPage";
import TrainingPage from "../TrainingPage/TrainingPage";
import Header from "../Header/Header";
import Filters from "../Filters/Filters";
import { IEmployees } from "../utils/types.ts";


function App() {

  const [fetchedData, setFetchedData] = useState<IEmployees[]>([]);

  return (
    <>
      <Header />
      <Filters setFetchedData={setFetchedData}/>
      <Routes>
        <Route path="/" element={<MainPage fetchedData={fetchedData} setFetchedData={setFetchedData} />} />
        <Route path="/training-request" Component={TrainingPage} />
      </Routes>
    </>
  );
}

export default App;
