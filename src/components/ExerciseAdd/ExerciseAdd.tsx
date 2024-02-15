import { useEffect, useState } from "react";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Exercise } from  "../../../models/Exercise";
import { Routine } from "../../../models/Routine";
import { Plan } from "../../../models/Plan";
import "./ExerciseAdd.css";

type ExerciseAddProps = {
    selectedExercise: Exercise;
    selectedRoutine: Routine;
    selectedPlan: Plan;
    manageRoutine: (action: string, routine: Routine) => void;
};

export default function ExerciseAdd({ selectedExercise, selectedRoutine, selectedPlan, manageRoutine } : ExerciseAddProps){
    const [workingRoutine, setWorkingRoutine] = useState<Routine>(new Routine());
    const [action, setAction] = useState<string>("");
    
    useEffect(() => {
        if (selectedExercise.exercise_id === 0){
            setWorkingRoutine(Object.assign({}, selectedRoutine));
            setAction("Update");
        } else{
            const newRoutine = new Routine();
            const exercise = Object.assign({}, selectedExercise);
            newRoutine.exercise = exercise;
            newRoutine.exercise_id = selectedExercise.exercise_id;
            newRoutine.plan_id = selectedPlan.plan_id;
            setWorkingRoutine(newRoutine);
            setAction("Add");
        }
    }, [selectedExercise, selectedRoutine]);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWorkingRoutine((routine) => {
            return {...routine, [event.target.name]: event.target.value};
        });
    };

    const handleResetButtonClick = () => {
        const resetValues = {weight: 0, duration: 0, reps: 0};
        setWorkingRoutine((routine) => {
            return {...routine, ...resetValues};
        });
    }

    const handleAddButtonClick = () => {
        manageRoutine(action, workingRoutine);
    }

    return (
        <>
        {(selectedExercise.exercise_id === 0 && selectedRoutine.routine_id === 0) 
        ? 
        <div className="exerciseAddEmpty">
            <div className="exerciseAddEmptyItem">
                <ArrowCircleRightIcon />
                <Typography variant="h4">Select an Exercise to Add</Typography>
            </div>
            <div className="exerciseAddEmptyItem">
                <Typography variant="h4">Select a Routine to Update</Typography>
                <ArrowCircleLeftIcon />
            </div>
        </div>
        : 
        <div className="exerciseAdd">
            <Typography className="exerciseAddHeader" variant="h4">{action} to Plan: {selectedPlan.name}</Typography>
            <div className="exerciseAddSubHeader">
                <Typography variant="h5">{workingRoutine.exercise.name}</Typography>
                <Typography variant="h6">{workingRoutine.exercise.description}</Typography>
            </div>
            <div className="exerciseAddBody">
                <FormControl className="exerciseAddBodyItems" variant="standard">
                    <TextField label="Repetitions" name="reps" variant="outlined" value={workingRoutine.reps} onChange={handleTextChange}/>
                    <TextField label="Duration (mins)" name="duration" variant="outlined" value={workingRoutine.duration} onChange={handleTextChange}/>
                    <TextField label="Equipment Weight (kg)" name="weight" variant="outlined" value={workingRoutine.weight} onChange={handleTextChange}/>
                </FormControl>
            </div>
            <div className="exerciseAddFooter">
                <Button variant="contained" onClick={handleResetButtonClick}>Clear</Button>
                <Button variant="contained" onClick={handleAddButtonClick}>{action.toUpperCase()}</Button>
            </div>
        </div>}
        </>
    );
}