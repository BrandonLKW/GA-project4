import { useEffect, useState } from "react";
import { Button, CircularProgress, FormControl, InputLabel, List, ListItemButton, ListItemText, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { getAllExerciseGroups, getAllExerciseByFilter } from "../../util/plan-service";
import { Exercise } from  "../../../models/Exercise";

type ExerciseSearchProps = {
    setSelectedExercise: (exercise: Exercise) => void;
};

export default function ExerciseSearch({ setSelectedExercise } : ExerciseSearchProps){
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
                    newSearchList.push(new Exercise(exercise.name, exercise.muscle_group, exercise.description, exercise.id));
                }
            }
            setExerciseList(newSearchList);
            setShowLoading(false);
        }
        loadSearchFilters();
    };

    const handleListItemClick = (exercise: Exercise) => {
        console.log(exercise);
        setSelectedExercise(exercise);
    }

    return (
        <div className="exerciseSearch">
            <div className="exerciseSearchHeader">
                <h1>Exercise List</h1>
            </div>
            <div className="exerciseSearchBody">
                <label>Filter By:</label><br/>
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
                <Button onClick={resetSearchFilters}>Reset</Button>
                <Button onClick={searchFilters}>Search</Button>
            </div>
            <div className="exerciseSearchFooter">
                {showLoading ? 
                <CircularProgress /> 
                : 
                <List>
                    {exerciseList?.map((exercise) => (
                    <List key={exercise.id}>
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