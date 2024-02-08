import { useState } from "react";
import { Button } from "@mui/material";
import LoginFormModal from "../../components/Modal/LoginFormModal";
import SignupFormModal from "../../components/Modal/SignupFormModal";
import { User } from "../../../models/User";

type UserPageProps = {
    setUser: (user: User) => void;
};

export default function UserPage({ setUser } : UserPageProps){
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showSignupModal, setShowSignupModal] = useState<boolean>(false);
    const onClickLogin = () => {
        setShowLoginModal(true);
    } 
    
    const onClickSignup = () => {
        setShowSignupModal(true);
    }

    return(
        <div>
            <h1>LOGO HERE</h1>
            <Button onClick={onClickLogin}>Login</Button>
            <Button onClick={onClickSignup}>Signup</Button>
            <LoginFormModal showModal={showLoginModal} setShowModal={setShowLoginModal} setUser={setUser}/>
            <SignupFormModal showModal={showSignupModal} setShowModal={setShowSignupModal} setUser={setUser}/>
        </div>
    );
}


