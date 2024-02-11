import { useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { Exercise } from  "../../../models/Exercise";
import { Routine } from "../../../models/Routine";

type ExerciseSearchProps = {
    selectedExercise: Exercise;
};

export default function ExerciseAdd({ selectedExercise } : ExerciseSearchProps){
    const [routine, setRoutine] = useState<Routine>(new Routine());
    
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoutine((routine) => {
            return {...routine, [event.target.name]: event.target.value};
        });
    };

    const resetRoutine = () => {
        const resetValues = {weight: 0, duration: 0, reps: 0};
        setRoutine((routine) => {
            return {...routine, ...resetValues};
        });
    }

    const addRoutine = () => {

    }
    
    return (
        <>
        {selectedExercise.id === 0 ? <h1>Select Exercise</h1> 
        : 
        <div className="exerciseSearch">
            <div className="exerciseSearchHeader">
                <h1>{selectedExercise.name}</h1>
                <label>{selectedExercise.description}</label>
                <label>{routine.reps}</label>
            </div>
            <div className="exerciseSearchBody">
                <FormControl variant="standard">
                    <TextField label="Repetitions" name="reps" variant="outlined" value={routine.reps} onChange={handleTextChange}/>
                    <TextField label="Durations" name="duration" variant="outlined" value={routine.duration} onChange={handleTextChange}/>
                    <TextField label="Weight" name="weight" variant="outlined" value={routine.weight} onChange={handleTextChange}/>
                </FormControl>
                <Button onClick={resetRoutine}>Clear</Button>
                <Button onClick={addRoutine}>Add</Button>
            </div>
        </div>}
        </>
    );
}