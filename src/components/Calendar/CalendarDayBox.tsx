import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../pages/App/App";
import dayjs, { Dayjs } from 'dayjs';
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";
import 'dayjs/locale/en-sg';
import { getWorkoutsByDateRange, getWorkoutRoutinesByWorkout } from "../../util/workout-service";
import PendingIcon from '@mui/icons-material/Pending';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Workout } from "../../../models/Workout";
import { WorkoutRoutine } from "../../../models/WorkoutRoutine";
import "./Calendar.css";
import { Exercise } from "../../../models/Exercise";
import ViewWorkoutModal from "../Modal/ViewWorkoutModal";

type CalendarDayBoxProps = {
    date: Date;
};
dayjs.extend(utc);
dayjs.extend(timezone);

export default function CalendarDayBox({ date } : CalendarDayBoxProps){
    const [showWorkout, setShowWorkout] = useState<boolean>(false);
    const [hasPending, setHasPending] = useState<boolean>(false);
    const [hasCompleted, setHasCompleted] = useState<boolean>(false);
    const [workoutList, setWorkoutList] = useState<Workout[]>([]);
    const user = useContext(UserContext);
    const day = date.getTime() === 0 ? 0 : date.getDate();
    
    useEffect(() => {
        const loadDayInfo = async () => {
            setHasCompleted(false);
            setHasPending(false);
            const startdate = dayjs(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)).tz("Asia/Kuala_Lumpur"); //0000HRS
            const enddate = dayjs(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)).tz("Asia/Kuala_Lumpur"); //2359HRS
            const response = await getWorkoutsByDateRange(user.user_id, startdate.format("YYYY-MM-DD"), enddate.format("YYYY-MM-DD"));
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
                    const newWorkout = new Workout(row.workout_date, row.body_weight, row.status, row.notes, row.plan_name, row.workout_id);
                    const checkWorkoutRoutine = await getWorkoutRoutinesByWorkout(row.workout_id);
                    
                    if (checkWorkoutRoutine){
                        const workoutRoutineList = [];
                        for (const subRow of checkWorkoutRoutine){
                            const exercise = new Exercise(subRow.name, subRow.muscle_group, subRow.description);
                            workoutRoutineList.push(new WorkoutRoutine(subRow.seq, subRow.reps, subRow.duration, subRow.weight, subRow.exercise_id, row.workout_id, undefined, exercise));
                        }
                        newWorkout.routineList = workoutRoutineList;
                    }
                    newWorkoutList.push(newWorkout);
                }
                console.log(newWorkoutList);
                setWorkoutList(newWorkoutList);
            }
        };
        loadDayInfo();
    }, [date]);

    const handleBoxClick = () => {
        setShowWorkout(true);
    }

    if (day === 0){
        return (<label className="hidden">empty</label>);
    } else{
        return (
            <div>
                <div onClick={handleBoxClick}>
                    <h1>{day}</h1>
                    {hasPending ? <PendingIcon/>:<></>}
                    {hasCompleted ? <TaskAltIcon/>:<></>}
                </div>
                <ViewWorkoutModal workoutList={workoutList} showModal={showWorkout} setShowModal={setShowWorkout}/>
            </div>
        );
    }
}