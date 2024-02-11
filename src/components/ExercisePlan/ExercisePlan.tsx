import { useEffect, useState } from "react";
import { Collapse, List, ListSubheader, ListItemButton, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Plan } from  "../../../models/Plan";

type ExercisePlanProps = {
};

export default function ExercisePlan({ } : ExercisePlanProps){
    const [planList, setPlanList] = useState<Plan[]>([]);

    useEffect(() => {
        const testdata: Plan[] = [];
        testdata.push(new Plan("123",false,0,0,[],false));
        testdata.push(new Plan("456",false,1,0,[],false));
        testdata.push(new Plan("789",false,2,0,[],false));
        setPlanList(testdata);
    }, []);

    const handleListItemClick = (plan: Plan) => {
        setPlanList(planList.map((prevPlan) => {
            if (prevPlan.id === plan.id){
                prevPlan.display_routine = !prevPlan.display_routine;
            }
            return prevPlan;
        }));
    }
    return (
        <div>
            <List>
            {planList.map((plan) => (
                <div>
                    <ListItemButton onClick={() => handleListItemClick(plan)}>
                        <ListItemText primary={plan.name} />
                        {plan.display_routine ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={plan.display_routine} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                        </List>
                    </Collapse>
                </div>
            ))}
            </List>
        </div>
    );
}