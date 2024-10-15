import { Route, Routes } from "react-router";
import MainPage from "../MainPage/MainPage";
import TrainingPage from "../TrainingPage/TrainingPage";
import Header from "../Header/Header";
import Filters from "../Filters/Filters";

function App() {
  return (
    <>
      <Header />
      <Filters />
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/training-request" Component={TrainingPage} />
      </Routes>
    </>
  );
}

export default App;
