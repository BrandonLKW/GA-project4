import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

type LoginFormModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    setUser: (user: String) => void;
};

export default function LoginFormModal({ showModal, setShowModal, setUser } : LoginFormModalProps){
    const navigate = useNavigate();
    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const formData = new FormData(event.currentTarget);
        // const formJson = Object.fromEntries((formData as any).entries());
        // const email = formJson.email;
        handleClose();
        setUser("HELLO");
        navigate("/main");
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
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your login credentials
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
                <Button type="submit">Subscribe</Button>
            </DialogActions>
        </Dialog>
    </>
    );
}