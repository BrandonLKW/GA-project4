import { useState } from "react";
import { Alert, Button, Box, Checkbox, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormGroup, FormControlLabel, LinearProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signup } from "../../util/user-service";
import { User } from "../../../models/User";

type SignupFormModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    setUser: (user: User) => void;
};

export default function SignupFormModal({ showModal, setShowModal, setUser } : SignupFormModalProps){
    const [enablePremium, setEnablePremium] = useState<boolean>(false);
    const navigate = useNavigate();

    const onClickPremium = () => {
        setEnablePremium(!enablePremium);
    }

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const checkSignup = async () => {
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            let user = new User(formJson.name, formJson.email, formJson.password);
            const response = await signup(user);
            if (response?.id){
                user = new User(response.name, response.email, response.password, 0, 0, false, response.id);
                setUser(user);
                handleClose();
                navigate("/main");
            } 
        }
        checkSignup();
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
                        type="text"
                        fullWidth
                        variant="standard"/>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="confirm_password"
                        label="Confirm Password"
                        type="text"
                        fullWidth
                        variant="standard"/>
                    <FormControlLabel control={<Checkbox value={enablePremium} onClick={onClickPremium}/>} label="Sign up for Premium? (You can do this later as well)" />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="cardnum"
                        label="Card Number"
                        type="text"
                        fullWidth
                        variant="standard"
                        disabled={!enablePremium}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="cvv"
                        label="CVV Number"
                        type="text"
                        fullWidth
                        variant="standard"
                        disabled={!enablePremium}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Sign Up</Button>
                </DialogActions>
                <Alert variant="outlined" severity="error" sx={{display: "none"}}>
                    Error during Sign Up, please check your details and try again.
                </Alert>
                <Box sx={{ width: '100%', display: "none"}}>
                    <LinearProgress/>
                </Box>
            </Dialog>
        </>
        );
}