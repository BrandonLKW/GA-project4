import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../pages/App/App";
import { getWorkoutsByDateRange } from "../../util/workout-service";
import PendingIcon from '@mui/icons-material/Pending';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Workout } from "../../../models/Workout";
import "./Calendar.css";

type CalendarDayBoxProps = {
    date: Date;
};

export default function CalendarDayBox({ date } : CalendarDayBoxProps){
    const [hasPending, setHasPending] = useState<boolean>(false);
    const [hasCompleted, setHasCompleted] = useState<boolean>(false);
    const [workoutList, setWorkoutList] = useState<Workout[]>([]);
    const user = useContext(UserContext);
    const day = date.getTime() === 0 ? 0 : date.getDate();

    useEffect(() => {
        const loadDayInfo = async () => {
            setHasCompleted(false);
            setHasPending(false);
            const startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0); //0000HRS
            const enddate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59); //2359HRS
            const response = await getWorkoutsByDateRange(user.user_id, startdate, enddate);
            if (response){
                const newWorkoutList = [];
                for (const row of response){
                    switch(row.status){
                        case "Completed":
                            setHasCompleted(true);
                            break;
                        case "Planned":
                            setHasPending(true);
                            break;
                        default:
                            break;
                    }
                    newWorkoutList.push(new Workout(row.workout_date, row.body_weight, row.status, row.notes, row.plan_name));
                }
                setWorkoutList(newWorkoutList);
            }
        };
        loadDayInfo();
    }, [date]);

    if (day === 0){
        return (<label className="hidden">empty</label>);
    } else{
        return (
            <div>
                <h1>{day}</h1>
                {hasPending ? <PendingIcon/>:<></>}
                {hasCompleted ? <TaskAltIcon/>:<></>}
            </div>
        );
    }
}