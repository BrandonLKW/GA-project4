import { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { Workout } from "../../../models/Workout";
import { WorkoutRoutine } from "../../../models/WorkoutRoutine";

type ViewWorkoutModalProps = {
    workoutList: Workout[];
    showModal: boolean;
    setShowModal: (show: boolean) => void;
};

export default function ViewWorkoutModal({ workoutList, showModal, setShowModal } : ViewWorkoutModalProps){
    const [selectedWorkout, setSelectedWorkout] = useState<Workout>(new Workout());
    const [loadedWorkoutList, setLoadedWorkoutList] = useState<Workout[]>([]);
    const [loadedRoutineList, setLoadedRoutineList] = useState<WorkoutRoutine[]>([]);

    useEffect(() => {
        setLoadedWorkoutList([...workoutList]);
    }, [workoutList]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const formData = new FormData(event.currentTarget);
        // const formJson = Object.fromEntries((formData as any).entries());
    }

    const handleClose = () => {
        setShowModal(false);
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
        setSelectedWorkout(workout);
        setLoadedRoutineList(workout.routineList);
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
                <DialogTitle>View All Workouts</DialogTitle>
                <DialogContent>
                    <div className="viewWorkout">
                        <List className="viewWorkoutPlans">
                        {loadedWorkoutList.map((workout) => (
                            <div>
                                <ListItemButton 
                                    selected={workout.display_workout} 
                                    onClick={() => handleListItemClick(workout)}>
                                    <ListItemText primary={workout.plan_name} />
                                </ListItemButton>
                            </div>
                        ))}
                        </List>
                        <div className="viewWorkoutRoutinesTitle">
                            <Typography>Workout Status: {selectedWorkout.status}</Typography>
                            <Typography>Recorded Body Weight: {selectedWorkout.body_weight}</Typography>
                        </div>
                        <div className="viewWorkoutRoutinesBody">
                            {selectedWorkout.routineList.map((wr) => (
                            <div>
                                <Typography>Exercise: {wr.exercise.name}</Typography>
                                <Typography>Repetitions: {wr.reps}</Typography>
                                <Typography>Duration: {wr.duration} mins</Typography>
                                <Typography>Equipment Weight: {wr.weight} mins</Typography>
                            </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button type="submit">Update Weight</Button>
                    <Button type="submit">Mark as Completed</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}