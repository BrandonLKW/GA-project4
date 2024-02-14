import { useState } from "react";
import { Alert, Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, LinearProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signup } from "../../util/user-service";
import { User } from "../../../models/User";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type SignupFormModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    setUser: (user: User) => void;
};

export default function SignupFormModal({ showModal, setShowModal, setUser } : SignupFormModalProps){
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("Error during Sign Up, please check your details and try again.");
    const navigate = useNavigate();

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowError(false);
        const checkSignup = async () => {
            setShowLoading(true);
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            //Do basic input checks
            if (formJson.password !== formJson.confirm_password){
                setShowError(true);
                setErrorMsg("Password and Confirm Password do not match. Please check and try again.")
                return;
            }
            //Send post request
            let user = new User(formJson.name, formJson.email, formJson.password);
            const response = await signup(user);
            if (response?.user_id){
                user = new User(response.name, response.email, undefined, 0, 0, false, response.user_id);
                setUser(user);
                handleClose();
                navigate("/main");
            } else {
                throw response.message;
            }
        }
        try {
            await checkSignup();
        } catch (error) {
            setShowError(true);
        }
        setShowLoading(false);
    }

    const handlePassTypeClick = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Dialog
                open={showModal}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: handleSubmit
                }}>
                <DialogTitle>New User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your credentials
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"/>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"/>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        variant="standard" 
                        InputProps={showPassword ? {endAdornment: <VisibilityOffIcon onClick={handlePassTypeClick}/>} : {endAdornment: <VisibilityIcon onClick={handlePassTypeClick}/>}}/>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="confirm_password"
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        variant="standard" 
                        InputProps={showPassword ? {endAdornment: <VisibilityOffIcon onClick={handlePassTypeClick}/>} : {endAdornment: <VisibilityIcon onClick={handlePassTypeClick}/>}}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Sign Up</Button>
                </DialogActions>
                <Alert variant="outlined" severity="error" sx={{display: showError ? "" : "none"}}>
                    {errorMsg}
                </Alert>
                <Box sx={{ width: '100%', display: showLoading ? "" : "none"}}>
                    <LinearProgress/>
                </Box>
            </Dialog>
        </>
        );
}