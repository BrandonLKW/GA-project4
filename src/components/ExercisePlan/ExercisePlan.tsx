import { useEffect, useState } from "react";
import { Button, Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { getAllTemplatePlans, getAllUserPlans, getRoutinesByPlan } from "../../util/plan-service";
import { Plan } from  "../../../models/Plan";
import { User } from "../../../models/User";
import { Exercise } from "../../../models/Exercise";
import { Routine } from "../../../models/Routine";
import { getExerciseById } from "../../util/plan-api";
import AddPlanModal from "../Modal/AddPlanModal";
import "./ExercisePlan.css";

type ExercisePlanProps = {
    user: User;
    setSelectedExercise: (exercise: Exercise) => void;
    setSelectedRoutine: (rountine: Routine) => void;
    setSelectedPlan: (plan: Plan) => void;
};

export default function ExercisePlan({ user, setSelectedExercise, setSelectedRoutine, setSelectedPlan } : ExercisePlanProps){
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [selectedRoutineItem, setSelectedRoutineItem] = useState<Routine>(new Routine());
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
    }, [showAddModal]);

    const loadPlanDetails = async (response: any) =>{
        const loadedPlanList: Plan[] = [];
        if (response){
            for (const planRow of response){
                const plan = new Plan(planRow.name, planRow.is_template, planRow.plan_id);
                const routineList: Routine[] = [];
                const routineRes = await getRoutinesByPlan(plan.plan_id);
                if (routineRes){
                    for (const routineRow of routineRes){
                        const routine = new Routine(routineRow.seq, routineRow.reps, routineRow.duration, routineRow.weight, routineRow.routine_id, routineRow.exercise_id);
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

    const handleListItemClick = (plan: Plan) => {
        setPlanList(planList.map((prevPlan) => {
            if (prevPlan.plan_id === plan.plan_id){
                prevPlan.display_routine = !prevPlan.display_routine;
            } else {
                prevPlan.display_routine = false;
            }
            return prevPlan;
        }));
        setSelectedPlan(plan);
        setSelectedExercise(new Exercise());
        setSelectedRoutine(new Routine());
        setSelectedRoutineItem(new Routine());
    }

    const handleRoutineItemClick = (routine: Routine) => {
        setSelectedExercise(new Exercise());
        setSelectedRoutine(routine);
        setSelectedRoutineItem(routine);
    }

    const handleAddButtonClick = () => {
        setShowAddModal(true);
    }

    return (
        <div className="exercisePlan">
            <h1 className="exerciseAddHeader">Plans</h1>
            <div className="exerciseAddBody">
                <List>
                {planList.map((plan) => (
                    <div>
                        <ListItemButton 
                            selected={plan.display_routine} 
                            onClick={() => handleListItemClick(plan)}>
                            <ListItemText primary={plan.name} />
                            {plan.display_routine ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        {plan.routineList.map((routine) => (
                            <Collapse in={plan.display_routine} timeout="auto">
                                <List component="div" disablePadding>
                                    <ListItemButton 
                                        sx={{ pl: 4 }}  
                                        selected={selectedRoutineItem.routine_id === routine.routine_id}
                                        onClick={() => handleRoutineItemClick(routine)}>
                                        <ListItemText primary={routine.exercise.name}/>
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        ))}
                    </div>
                ))}
                </List>
            </div>
            <div className="exerciseAddFooter">
                <Button>Delete</Button>
                <Button onClick={handleAddButtonClick}>Add</Button>
                <AddPlanModal user={user} showModal={showAddModal} setShowModal={setShowAddModal} setPlanList={setPlanList}/>
            </div>
        </div>
    );
}