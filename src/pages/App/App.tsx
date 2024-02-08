import { Button } from "@mui/material";
// import { useState } from 'react'
import './App.css'
import NavBar from "../../components/NavBar/Navbar";
import { Route, Routes } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import PlanPage from "../PlanPage/PlanPage";
import MetricsPage from "../MetricsPage/MetricsPage";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="appBody">
      <NavBar />
      <h1>LOGO HERE</h1>
      <Button>Login</Button>
      <Button>Signup</Button>
      <Routes>
        <Route path="/main" element={<MainPage />}/>
        <Route path="/plan" element={<PlanPage />}/>
        <Route path="/metrics" element={<MetricsPage />}/>
      </Routes>
    </div>
  )
}

export default App
