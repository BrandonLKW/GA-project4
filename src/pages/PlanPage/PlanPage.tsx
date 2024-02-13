import { useState } from "react";
import { addUserRoutine, updateUserRoutine, deleteUserRoutine } from "../../util/plan-service";
import ExerciseSearch from "../../components/ExerciseSearch/ExerciseSearch";
import ExerciseAdd from "../../components/ExerciseAdd/ExerciseAdd";
import ExercisePlan from "../../components/ExercisePlan/ExercisePlan";
import { Exercise } from  "../../../models/Exercise";
import { Plan } from "../../../models/Plan";
import { Routine } from "../../../models/Routine";
import "./PlanPage.css";

type PlanPageProps = {
    planList: Plan[];
    setPlanList: (planList: Plan[]) => void;
};

export default function PlanPage({ planList, setPlanList } : PlanPageProps){
    const [selectedExercise, setSelectedExercise] = useState<Exercise>(new Exercise());
    const [selectedRoutine, setSelectedRoutine] = useState<Routine>(new Routine());
    const [selectedPlan, setSelectedPlan] = useState<Plan>(new Plan());
    
    const manageRoutine = (action: string, routine: Routine) => {
        const tryManageRoutine = async () => {
            let response = null;
            switch (action) {
                case "Add":
                    response = await addUserRoutine(routine);
                    break;
                case "Update":
                    response = await updateUserRoutine(routine);
                    break;
                case "Delete":
                    response = await deleteUserRoutine(routine.routine_id);
                    break;
                default:
                    break;
            }
            if (response?.routine_id){  
                if (action !== "Delete"){
                    routine.routine_id = response.routine_id
                    const newPlanList = [...planList];
                    for (const plan of newPlanList){
                        if (plan.plan_id === selectedPlan.plan_id){
                            switch (action) {
                                case "Add":
                                    selectedPlan.routineList.push(routine);
                                    break;
                                case "Update":
                                    selectedPlan.routineList = selectedPlan.routineList.map((item) => {
                                        if (item.routine_id === routine.routine_id){
                                            return routine;
                                        }   
                                        return item;
                                    });
                                    break;
                                case "Delete":
                                    selectedPlan.routineList = selectedPlan.routineList.filter((item) => item.routine_id !== routine.routine_id);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    setPlanList(newPlanList);
                }
                setSelectedExercise(new Exercise());
                setSelectedRoutine(new Routine());
            } else{
                //throw error message;
            }
        }; 
        tryManageRoutine();
    }

    return(
        <div className="planPage">
            <div className="planPageCol1">
                <ExercisePlan 
                    planList={planList} 
                    setPlanList={setPlanList} 
                    setSelectedExercise={setSelectedExercise} 
                    selectedRoutine = {selectedRoutine} 
                    setSelectedRoutine={setSelectedRoutine} 
                    setSelectedPlan={setSelectedPlan}/>
            </div>
            <div className="planPageCol2">
                <ExerciseAdd 
                    selectedExercise={selectedExercise} 
                    selectedRoutine={selectedRoutine} 
                    selectedPlan={selectedPlan} 
                    manageRoutine={manageRoutine}/>
            </div>
            <div className="planPageCol3">
                <ExerciseSearch 
                    setSelectedExercise={setSelectedExercise} 
                    setSelectedRoutine={setSelectedRoutine}/>
            </div>
        </div>
    );
}