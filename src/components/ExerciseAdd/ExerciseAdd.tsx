import { useEffect, useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
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
        <div>
            <h1>Select an Exercise to Add ---&gt;</h1> 
            <h1>&lt;--- Or Select a Routine to Update</h1> 
        </div>
        : 
        <div className="exerciseAdd">
            <h1 className="exerciseAddHeader">{action} to Plan: {selectedPlan.name}</h1>
            <h2 className="exerciseAddSubHeader">{workingRoutine.exercise.name}</h2>
            <label className="exerciseAddDescription">{workingRoutine.exercise.description}</label>
            <div className="exerciseAddBody">
                <FormControl variant="standard">
                    <TextField label="Repetitions" name="reps" variant="outlined" value={workingRoutine.reps} onChange={handleTextChange}/>
                    <TextField label="Durations" name="duration" variant="outlined" value={workingRoutine.duration} onChange={handleTextChange}/>
                    <TextField label="Weight" name="weight" variant="outlined" value={workingRoutine.weight} onChange={handleTextChange}/>
                </FormControl>
            </div>
            <div className="exerciseAddFooter">
                <Button onClick={handleResetButtonClick}>Clear</Button>
                <Button onClick={handleAddButtonClick}>{action.toUpperCase()}</Button>
            </div>
        </div>}
        </>
    );
}