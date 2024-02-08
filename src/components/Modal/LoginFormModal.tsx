import { useState } from "react";
import { Alert, Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, LinearProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../util/user-service";
import { User } from "../../../models/User";

type LoginFormModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    setUser: (user: User) => void;
};

export default function LoginFormModal({ showModal, setShowModal, setUser } : LoginFormModalProps){
    const [showLoading, setShowLoading] = useState<string>("none");
    const [showError, setShowError] = useState<string>("none");
    const navigate = useNavigate();
    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const checkLogin = async () => {
            setShowLoading("");
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            let user = new User("", formJson.email, formJson.password);
            const response = await login(user);
            console.log("RESPONSE", response);
            if (response?.id){
                setShowError("none");
                user = new User(response.name, response.email, response.password, 0, 0, false, response.id);
                setUser(user);
                handleClose();
                navigate("/main");
            } 
        }
        try {
            await checkLogin();
        } catch (error) {
            setShowError("");
        }
        setShowLoading("none");
    }

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
                    id="name"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"/>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="password"
                    label="Password"
                    type="text"
                    fullWidth
                    variant="standard"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Log In</Button>
            </DialogActions>
            <Alert variant="outlined" severity="error" sx={{display: showError}}>
                Error during Login, please check your details and try again.
            </Alert>
            <Box sx={{ width: '100%', display: showLoading}}>
                <LinearProgress/>
            </Box>
        </Dialog>
    </>
    );
}