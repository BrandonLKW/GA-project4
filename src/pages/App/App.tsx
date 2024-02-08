import { useState } from 'react'
import './App.css'
import NavBar from "../../components/NavBar/Navbar";
import { Route, Routes } from "react-router-dom";
import UserPage from '../UserPage/UserPage';
import MainPage from "../MainPage/MainPage";
import PlanPage from "../PlanPage/PlanPage";
import MetricsPage from "../MetricsPage/MetricsPage";

function App() {
  const [user, setUser] = useState<String>("");
  console.log(user);
  if (!user){
    return(
    <>
      <Routes>
        <Route path="*" element={<UserPage setUser={setUser}/>}/>
      </Routes>
    </>
    );
  } else{
    return (
    <div className="appBody">
      <NavBar setUser={setUser}/>
      <Routes>
        <Route path="/main" element={<MainPage />}/>
        <Route path="/plan" element={<PlanPage />}/>
        <Route path="/metrics" element={<MetricsPage />}/>
        <Route path="*" element={<MainPage />}/>
      </Routes>
    </div>
    )
  }
}

export default App
