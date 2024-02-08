import { Button } from "@mui/material";
// import { useState } from 'react'
import './App.css'
import NavBar from "../../components/NavBar/Navbar";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="appBody">
      <NavBar />
        <h1>LOGO HERE</h1>
        <Button>Login</Button>
        <Button>Signup</Button>
    </div>
  )
}

export default App
