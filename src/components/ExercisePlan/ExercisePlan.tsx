import { useContext, useState } from "react";
import { UserContext } from "../../pages/App/App";
import { Button, Collapse, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { addUserPlan,  } from "../../util/plan-service";
import { Plan } from  "../../../models/Plan";
import { Exercise } from "../../../models/Exercise";
import { Routine } from "../../../models/Routine";
import AddPlanModal from "../Modal/AddPlanModal";
import "./ExercisePlan.css";

type ExercisePlanProps = {
    planList: Plan[];
    setPlanList: (planList: Plan[]) => void;
    setSelectedExercise: (exercise: Exercise) => void;
    selectedRoutine: Routine;
    setSelectedRoutine: (rountine: Routine) => void;
    setSelectedPlan: (plan: Plan) => void;
};

export default function ExercisePlan({ planList, setPlanList, setSelectedExercise, selectedRoutine, setSelectedRoutine, setSelectedPlan } : ExercisePlanProps){
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const user = useContext(UserContext);
    
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
    }

    const handleRoutineItemClick = (routine: Routine) => {
        if (routine.routine_id === selectedRoutine.routine_id){
            setSelectedRoutine(new Routine()); //Unselect existing selection
        } else{
            setSelectedRoutine(routine);
        }
        setSelectedExercise(new Exercise());
    }

    const handleAddButtonClick = () => {
        setShowAddModal(true);
    }

    const addPlan = async (name: string) => {
        const response = await addUserPlan(name, user.user_id);
        if (response?.plan_id){
            setShowAddModal(false);
            const newPlan = new Plan(name, false, response.plan_id, user.user_id);
            setPlanList([...planList, newPlan]);
        }
    }

    return (
        <div className="exercisePlan">
            <Typography className="exerciseAddHeader" variant="h4">Plans</Typography>
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
                                        selected={selectedRoutine.routine_id === routine.routine_id}
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
                <hr/>
                <Button variant="contained">Delete</Button>
                <Button variant="contained" onClick={handleAddButtonClick}>Add</Button>
                <AddPlanModal addPlan={addPlan} showModal={showAddModal} setShowModal={setShowAddModal}/>
            </div>
        </div>
    );
}