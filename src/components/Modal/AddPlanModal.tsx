import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { addUserPlan } from "../../util/plan-service";
import { Plan } from "../../../models/Plan";
import { User } from "../../../models/User";

type AddPlanModalProps = {
    user: User;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    setPlanList: (planList: Plan[]) => void;
};

export default function AddPlanModal({ user, showModal, setShowModal, setPlanList } : AddPlanModalProps){

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const name = formJson.name;
        const response = await addUserPlan(name, user.user_id);
        if (response?.plan_id){
            setShowModal(false);
            handleClose();
        }
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