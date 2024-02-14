import { useState } from "react";
import { Button } from "@mui/material";
import LoginFormModal from "../../components/Modal/LoginFormModal";
import SignupFormModal from "../../components/Modal/SignupFormModal";
import { User } from "../../../models/User";
import image from "../../../src/img/title_img.png";
import "./UserPage.css";

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
        <div className="userpage">
            <img src={image}/>
            <Button className="userPageButton" variant="contained" onClick={onClickLogin}>Login</Button>
            <Button className="userPageButton" variant="contained" onClick={onClickSignup}>Signup</Button>
            <LoginFormModal showModal={showLoginModal} setShowModal={setShowLoginModal} setUser={setUser}/>
            <SignupFormModal showModal={showSignupModal} setShowModal={setShowSignupModal} setUser={setUser}/>
        </div>
    );
}


