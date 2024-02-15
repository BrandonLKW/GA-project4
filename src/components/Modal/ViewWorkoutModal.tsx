import { useEffect, useState } from "react";
import { Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItemButton, ListItemText, ListSubheader, TextField, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { updateWorkout } from "../../util/workout-service";
import PendingIcon from '@mui/icons-material/Pending';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Workout } from "../../../models/Workout";
import dayjs, { Dayjs } from "dayjs";
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";
import "./Modal.css";

type ViewWorkoutModalProps = {
    workoutList: Workout[];
    showModal: boolean;
    setShowModal: (show: boolean) => void;
};
dayjs.extend(utc);
dayjs.extend(timezone);

export default function ViewWorkoutModal({ workoutList, showModal, setShowModal } : ViewWorkoutModalProps){
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [dateStr, setDateStr] = useState<string>("");
    const [selectedWorkout, setSelectedWorkout] = useState<Workout>(new Workout());
    const [loadedWorkoutList, setLoadedWorkoutList] = useState<Workout[]>([]);

    useEffect(() => {
        if (workoutList[0]){
            setDateStr(dayjs(workoutList[0].workout_date).tz("Asia/Kuala_Lumpur").format("DD-MMM-YYYY"));
        }
        setLoadedWorkoutList([...workoutList]);
    }, [workoutList]);

    const handleClose = () => {
        setSelectedWorkout(new Workout());
        setShowMessage(false);
        setShowModal(false);
    }

    const handleUpdateWeight = async () => {
        const response = await updateWorkout(selectedWorkout);
        if (response){
            setShowMessage(true);
        }
    }

    const handleComplete = async () => {
        selectedWorkout.status = "Completed"
        const response = await updateWorkout(selectedWorkout);
        if (response){
            setShowMessage(true);
        }
    }

    const handleListItemClick = (workout: Workout) => {
        setLoadedWorkoutList(loadedWorkoutList.map((prev) => {
            if (prev.workout_id === workout.workout_id){
                prev.display_workout = !prev.display_workout;
            } else {
                prev.display_workout = false;
            }
            return prev;
        }));
        setSelectedWorkout(Object.assign({}, workout));
        setShowMessage(false);
    }

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedWorkout((workout) => {
            return {...workout, [event.target.name]: event.target.value};
        });
        setShowMessage(false);
    }

    return (
        <>
            <Dialog
                open={showModal}
                onClose={handleClose}
                PaperProps={{component: 'form'}}>
                <DialogTitle>View All Workouts</DialogTitle>
                <DialogContent>
                    <div className="viewWorkout">
                        <div className="viewWorkoutPlans" >
                            <List 
                                title="Workout Plans" 
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Workouts for: {dateStr}
                                    </ListSubheader>
                                }>
                            {loadedWorkoutList.map((workout) => (
                                <div>
                                    <ListItemButton 
                                        selected={workout.display_workout} 
                                        onClick={() => handleListItemClick(workout)}>
                                        <ListItemText primary={workout.plan_name} />
                                        {workout.status === "Completed" ? <TaskAltIcon />: <PendingIcon />}
                                    </ListItemButton>
                                </div>
                            ))}
                            </List>
                        </div>
                        {selectedWorkout.workout_id > 0 ? 
                        <div className="viewWorkoutRoutinesTitle">
                            <Typography variant="h5">Status: {selectedWorkout.status}</Typography>
                            <TextField 
                                name="body_weight"
                                label="Recorded Body Weight" 
                                variant="outlined" 
                                value={selectedWorkout.body_weight} 
                                onChange={handleWeightChange}/>
                        </div>: <></>}
                        {selectedWorkout.workout_id > 0 ? 
                        <div className="viewWorkoutRoutinesBody">
                            {selectedWorkout.routineList.map((wr) => (
                            <div className="viewWorkoutRoutinesBodyItem">
                                <Typography variant="body2">Exercise: {wr.exercise.name}</Typography>
                                <Typography variant="body2">Repetitions: {wr.reps}</Typography>
                                <Typography variant="body2">Duration: {wr.duration} mins</Typography>
                                <Typography variant="body2">Equipment Weight: {wr.weight} kg</Typography>
                                <hr/>
                            </div>
                            ))}
                        </div>: <></>}
                    </div>
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{display: showMessage ? "" : "none"}}>
                        Transaction done!
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleUpdateWeight}>Update Weight</Button>
                    {selectedWorkout?.status === "Planned" ? <Button onClick={handleComplete}>Mark as Completed</Button>: <></>}
                </DialogActions>
            </Dialog>
        </>
    );
}