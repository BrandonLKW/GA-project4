import { useState } from "react";
import ExerciseSearch from "../../components/ExerciseSearch/ExerciseSearch";
import ExerciseAdd from "../../components/ExerciseAdd/ExerciseAdd";
import { Exercise } from  "../../../models/Exercise";
import "./PlanPage.css";
import ExercisePlan from "../../components/ExercisePlan/ExercisePlan";

export default function PlanPage(){
    const [selectedExercise, setSelectedExercise] = useState<Exercise>(new Exercise());

    return(
        <div className="planPage">
            <div className="planPageCol1">
                <ExercisePlan />
            </div>
            <div className="planPageCol2">
                <ExerciseSearch setSelectedExercise={setSelectedExercise}/>
            </div>
            <div className="planPageCol3">
                <ExerciseAdd selectedExercise={selectedExercise}/>
            </div>
        </div>
    );
}