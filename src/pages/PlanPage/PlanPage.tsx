import { useState } from "react";
import ExerciseSearch from "../../components/ExerciseSearch/ExerciseSearch";
import { Exercise } from  "../../../models/Exercise";

export default function PlanPage(){
    const [selectedExercise, setSelectedExercise] = useState<Exercise>(new Exercise());

    return(
        <div>
            <h1>{selectedExercise?.name}</h1>
            <ExerciseSearch setSelectedExercise={setSelectedExercise}/>
        </div>
    );
}