import { useState } from "react";
import { addExercise, updateExercise, deleteExercise } from "../../util/plan-service";
import ExerciseSearch from "../../components/ExerciseSearch/ExerciseSearch";
import ExerciseAddAdmin from "../../components/ExerciseAddAdmin/ExerciseAddAdmin";
import { Exercise } from "../../../models/Exercise";
import { Routine } from "../../../models/Routine";
import "./ExercisePage.css";

type ExercisePageProps = {

};

export default function ExercisePage({ } : ExercisePageProps){
    const [selectedExercise, setSelectedExercise] = useState<Exercise>(new Exercise());

    const setSelectedRoutine = (routine: Routine) => {
        //empty method due to reuse of Exercise Search component
    }

    const manageExercise = (action: string, exercise: Exercise) => {
        const tryManageRoutine = async () => {
            let response = null;
            switch (action) {
                case "Add":
                    response = await addExercise(exercise);
                    break;
                case "Update":
                    response = await updateExercise(exercise);
                    break;
                case "Delete":
                    response = await deleteExercise(exercise.exercise_id);
                    break;
                default:
                    break;
            }
            if (response?.exercise_id){  
                setSelectedExercise(new Exercise());
            } else{
                //throw error message;
            }
        }; 
        tryManageRoutine();
    }

    return (
    <div className="exercisePage">
        <div className="exercisePageCol1">
            <ExerciseSearch 
                setSelectedExercise={setSelectedExercise} 
                setSelectedRoutine={setSelectedRoutine}/>
        </div>
        <div className="exercisePageCol2">
            <ExerciseAddAdmin selectedExercise={selectedExercise} manageExercise={manageExercise}/>
        </div>
    </div>
    );
}