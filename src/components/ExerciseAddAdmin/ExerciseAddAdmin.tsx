import { useEffect, useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { Exercise } from "../../../models/Exercise";

type ExerciseAddAdminProps = {
    selectedExercise: Exercise;
    manageExercise: (action: string, exercise: Exercise) => void;
};

export default function ExerciseAddAdmin({ selectedExercise, manageExercise } : ExerciseAddAdminProps){
    const [workingExercise, setWorkingExercise] = useState<Exercise>(new Exercise());
    const [action, setAction] = useState<string>("");

    useEffect(() => {
        if (selectedExercise.exercise_id === 0){
            setWorkingExercise(Object.assign({}, selectedExercise));
            setAction("Add");
        } else{
            setWorkingExercise(Object.assign({}, selectedExercise));
            setAction("Update");
        }
    }, [selectedExercise]);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWorkingExercise((exercise) => {
            return {...exercise, [event.target.name]: event.target.value};
        });
    };

    const handleResetButtonClick = () => {
        setWorkingExercise(new Exercise());
        setAction("Add");
    }

    const handleAddButtonClick = () => {
        manageExercise(action, workingExercise);
    }

    return (
        <>
            <h1 className="">{action} Exercise</h1>
            <div className="">
                <FormControl variant="standard">
                    <TextField label="Name" name="name" variant="outlined" value={workingExercise.name} onChange={handleTextChange}/>
                    <TextField label="Description" name="description" variant="outlined" value={workingExercise.description} onChange={handleTextChange}/>
                    <TextField label="Muscle Group" name="muscle_group" variant="outlined" value={workingExercise.muscle_group} onChange={handleTextChange}/>
                </FormControl>
            </div>
            <div className="">
                <Button onClick={handleResetButtonClick}>Clear</Button>
                <Button onClick={handleAddButtonClick}>{action.toUpperCase()}</Button>
            </div>
        </>
    );
}