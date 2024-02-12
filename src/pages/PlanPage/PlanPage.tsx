import { useState } from "react";
import ExerciseSearch from "../../components/ExerciseSearch/ExerciseSearch";
import ExerciseAdd from "../../components/ExerciseAdd/ExerciseAdd";
import ExercisePlan from "../../components/ExercisePlan/ExercisePlan";
import { Exercise } from  "../../../models/Exercise";
import { User } from "../../../models/User";
import { Plan } from "../../../models/Plan";
import { Routine } from "../../../models/Routine";
import "./PlanPage.css";


type PlanPageProps = {
    user: User;
};


export default function PlanPage({ user } : PlanPageProps){
    const [selectedExercise, setSelectedExercise] = useState<Exercise>(new Exercise());
    const [selectedRoutine, setSelectedRoutine] = useState<Routine>(new Routine());
    const [selectedPlan, setSelectedPlan] = useState<Plan>(new Plan());

    const updatePlan = () => {

    }

    return(
        <div className="planPage">
            <div className="planPageCol1">
                <ExercisePlan user={user} setSelectedExercise={setSelectedExercise} setSelectedRoutine={setSelectedRoutine} setSelectedPlan={setSelectedPlan}/>
            </div>
            <div className="planPageCol2">
                <ExerciseAdd selectedExercise={selectedExercise} selectedRoutine={selectedRoutine} selectedPlan={selectedPlan}/>
            </div>
            <div className="planPageCol3">
                <ExerciseSearch setSelectedExercise={setSelectedExercise} setSelectedRoutine={setSelectedRoutine}/>
            </div>
        </div>
    );
}