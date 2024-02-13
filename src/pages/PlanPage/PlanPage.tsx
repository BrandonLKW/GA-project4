import { useEffect, useState } from "react";
import { addUserRoutine, updateUserRoutine, deleteUserRoutine, getAllTemplatePlans, getAllUserPlans, getRoutinesByPlan, getExerciseById } from "../../util/plan-service";
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
    const [planList, setPlanList] = useState<Plan[]>([]);

    useEffect(() => {
        const loadTemplatePlans = async () => {
            //Load templates
            const planRes = await getAllTemplatePlans();
            const loadedTemplates = await loadPlanDetails(planRes);
            //Load user plans
            const userPlanRes = await getAllUserPlans(user.user_id);
            const loadedUserPlans = await loadPlanDetails(userPlanRes);
            setPlanList(loadedTemplates.concat(loadedUserPlans));
        }
        loadTemplatePlans();
    }, []);

    const loadPlanDetails = async (response: any) =>{
        const loadedPlanList: Plan[] = [];
        if (response){
            for (const planRow of response){
                const plan = new Plan(planRow.name, planRow.is_template, planRow.plan_id);
                const routineList: Routine[] = [];
                const routineRes = await getRoutinesByPlan(plan.plan_id);
                if (routineRes){
                    for (const routineRow of routineRes){
                        const routine = new Routine(routineRow.seq, routineRow.reps, routineRow.duration, routineRow.weight, routineRow.routine_id, routineRow.exercise_id, undefined, routineRow.plan_id);
                        const exerciseRes = await getExerciseById(routineRow.exercise_id);
                        if (exerciseRes){
                            const exercise = new Exercise(exerciseRes[0].name, exerciseRes[0].muscle_group, exerciseRes[0].description);
                            routine.exercise = exercise;
                        }
                        routineList.push(routine);
                    }
                }
                plan.routineList = routineList;
                loadedPlanList.push(plan);
            }
        } 
        return loadedPlanList;
    }

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
                    setPlanList((planList: Plan[]) => {
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
                        return newPlanList;
                    });
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
                    user={user} 
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