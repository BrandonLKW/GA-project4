import { useState } from "react";
import { Button } from "@mui/material";
import LoginFormModal from "../../components/Modal/LoginFormModal";

type UserPageProps = {
    setUser: (user: String) => void;
};

export default function UserPage({ setUser } : UserPageProps){
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const onClickLogin = () => {
        setShowLoginModal(true);
    } 
    
    const onClickSignup = () => {
    
    }

    return(
        <div>
            <h1>LOGO HERE</h1>
            <Button onClick={onClickLogin}>Login</Button>
            <Button onClick={onClickSignup}>Signup</Button>
            <LoginFormModal showModal={showLoginModal} setShowModal={setShowLoginModal} setUser={setUser}/>
        </div>
    );
}


