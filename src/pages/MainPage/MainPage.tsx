import { useContext, useState } from "react";
import { UserContext } from "../App/App";
import { Button } from "@mui/material";
import { addWorkouts } from "../../util/workout-service";
import Calendar from "../../components/Calendar/Calendar";
import MonthSpinner from "../../components/MonthSpinner/MonthSpinner";
import AddWorkoutModal from "../../components/Modal/AddWorkoutModal";
import { Plan } from "../../../models/Plan";
import { Workout } from "../../../models/Workout";
import "./MainPage.css";
import dayjs, { Dayjs } from "dayjs";
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";

type MainPageProps = {
    planList: Plan[];
};
dayjs.extend(utc);
dayjs.extend(timezone);

export default function MainPage({ planList } : MainPageProps){
    const [showAddWorkoutButton, setShowAddWorkoutButton] = useState<boolean>(false);
    const [viewDate, setViewDate] = useState<Dayjs>(dayjs(new Date()));
    const user = useContext(UserContext);

    const handleAddWorkoutButton = () => {
        setShowAddWorkoutButton(true);
    };

    const addWorkout = async (newWorkoutList: Workout[]) =>{
        for (const workout of newWorkoutList){
            workout.user_id = user.user_id;
        }
        const response = await addWorkouts(newWorkoutList);
        if (response.status){
            //Confirmation msg
        }
        setShowAddWorkoutButton(false);
        setViewDate(newWorkoutList[0].workout_date); //set calendar view to first date to refresh components
    };

    return(
        <div className="mainpage">
            <div className="mainpagecol1">
                <MonthSpinner viewDate={viewDate} setViewDate={setViewDate}/>
                <Button variant="contained" onClick={handleAddWorkoutButton}>Add Workout</Button>
                <AddWorkoutModal planList={planList} addWorkout={addWorkout} showModal={showAddWorkoutButton} setShowModal={setShowAddWorkoutButton}/>
            </div>
            <div className="mainpagecol2">
                <Calendar viewDate={viewDate}/>
            </div>
        </div>
    );
}