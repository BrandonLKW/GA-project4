import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import NavBar from "../../components/NavBar/Navbar";
import UserPage from '../UserPage/UserPage';
import MainPage from "../MainPage/MainPage";
import PlanPage from "../PlanPage/PlanPage";
import MetricsPage from "../MetricsPage/MetricsPage";
import { User } from "../../../models/User";

function App() {
  const [user, setUser] = useState<User>(new User());
  if (!user.user_id){
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
        <Route path="/plan" element={<PlanPage user={user}/>}/>
        <Route path="/metrics" element={<MetricsPage />}/>
        <Route path="*" element={<MainPage />}/>
      </Routes>
    </div>
    )
  }
}

export default App
