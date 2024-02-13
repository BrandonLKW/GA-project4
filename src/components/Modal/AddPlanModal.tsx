import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

type AddPlanModalProps = {
    addPlan: (name: string) => void;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
};

export default function AddPlanModal({ addPlan, showModal, setShowModal } : AddPlanModalProps){

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        addPlan(formJson.name);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <>
            <Dialog
                open={showModal}
                onClose={handleClose}
                PaperProps={{
                component: 'form',
                onSubmit: handleSubmit
                }}>
                <DialogTitle>Add New Plan</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="name"
                        label="Plan Name"
                        type="text"
                        fullWidth
                        variant="standard"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add Plan</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}