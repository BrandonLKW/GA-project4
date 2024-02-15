import { useState } from "react";
import { Alert, Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, LinearProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../util/user-service";
import { User } from "../../../models/User";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type LoginFormModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    setUser: (user: User) => void;
};

export default function LoginFormModal({ showModal, setShowModal, setUser } : LoginFormModalProps){
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowError(false);
        const checkLogin = async () => {
            setShowLoading(true);
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            let user = new User("", formJson.email, formJson.password);
            const response = await login(user);
            console.log(response);
            if (response?.user_id){
                user = new User(response.name, response.email, undefined, 0, 0, response.is_admin, response.user_id);
                setUser(user);
                handleClose();
                navigate("/main");
            } 
        }
        try {
            await checkLogin();
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
            <DialogTitle>Existing User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your credentials
                </DialogContentText>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Log In</Button>
            </DialogActions>
            <Alert variant="outlined" severity="error" sx={{display: showError ? "" : "none"}}>
                Error during Login, please check your details and try again.
            </Alert>
            <Box sx={{ width: '100%', display: showLoading ? "" : "none"}}>
                <LinearProgress/>
            </Box>
        </Dialog>
    </>
    );
}