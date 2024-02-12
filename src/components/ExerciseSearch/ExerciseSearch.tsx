import { useEffect, useState } from "react";
import { Button, CircularProgress, FormControl, InputLabel, List, ListItemButton, ListItemText, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { getAllExerciseGroups, getAllExerciseByFilter } from "../../util/plan-service";
import { Exercise } from  "../../../models/Exercise";
import { Routine } from  "../../../models/Routine";
import "./ExerciseSearch.css";

type ExerciseSearchProps = {
    setSelectedExercise: (exercise: Exercise) => void;
    setSelectedRoutine: (routine: Routine) => void;
};

export default function ExerciseSearch({ setSelectedExercise, setSelectedRoutine } : ExerciseSearchProps){
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [muscleGroupList, setMuscleGroupList] = useState<string[]>([]);
    const [searchMuscleGroup, setSearchMuscleGroup] = useState<string>("");
    const [searchWildcard, setSearchWildcard] = useState<string>("");
    const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

    useEffect(() => {
        const loadMuscleGroups = async () => {
            const response = await getAllExerciseGroups();
            if (response){
                const newGroupList = [];
                for (const item of response){
                    newGroupList.push(item.muscle_group);
                }
                setMuscleGroupList(newGroupList);
            } 
        }
        loadMuscleGroups();
    }, []);

    const handleMuscleGroupChange = (event: SelectChangeEvent) =>{
        setSearchMuscleGroup(event.target.value as string);
    };

    const handleWildcardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWildcard(event.target.value as string);
    };

    const resetSearchFilters = () => {
        setSearchMuscleGroup("");
        setSearchWildcard("");
        setExerciseList([]);
    };

    const searchFilters = async () => {
        setShowLoading(true);
        const loadSearchFilters = async () => {
            const searchObj = {
                "muscle_group": searchMuscleGroup,
                "name": searchWildcard
            };
            const response = await getAllExerciseByFilter(searchObj);
            const newSearchList: Exercise[] = [];
            if (response){
                for (const exercise of response){
                    console.log(exercise);
                    newSearchList.push(new Exercise(exercise.name, exercise.muscle_group, exercise.description, exercise.exercise_id));
                }
            }
            setExerciseList(newSearchList);
            setShowLoading(false);
        }
        loadSearchFilters();
    };

    const handleListItemClick = (exercise: Exercise) => {
        setSelectedExercise(exercise)
        setSelectedRoutine(new Routine());
    }

    return (
        <div className="exerciseSearch">
            <h1 className="exerciseSearchHeader">Search for Exercises</h1>
            <h2 className="exerciseSearchSubHeader">Filter By:</h2><br/>
            <div className="exerciseSearchBody">
                <FormControl variant="standard">
                    <InputLabel id="group-label">Muscle Group</InputLabel>
                    <Select 
                        labelId="group-label"
                        value={searchMuscleGroup}
                        onChange={handleMuscleGroupChange}>
                        {muscleGroupList?.map((group) => (<MenuItem key={group} value={group}>{group}</MenuItem>))}
                    </Select>
                    <TextField label="Search by Name..." variant="outlined" value={searchWildcard} onChange={handleWildcardChange}/>
                </FormControl>
            </div>
            <div className="exerciseSearchBody2">
                <Button onClick={resetSearchFilters}>Reset</Button>
                <Button onClick={searchFilters}>Search</Button>
            </div>
            <div className="exerciseSearchFooter">
                {showLoading ? 
                <CircularProgress /> 
                : 
                <List>
                    {exerciseList?.map((exercise) => (
                    <List key={exercise.exercise_id}>
                        <ListItemButton
                            onClick={() => handleListItemClick(exercise)}>
                        <ListItemText primary={exercise.name}/>
                        </ListItemButton>
                    </List>
                    ))}
                </List>}
            </div>
        </div>
    );
}