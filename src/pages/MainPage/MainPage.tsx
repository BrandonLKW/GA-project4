import { useState } from "react";
import { Button } from "@mui/material";
import { addWorkouts } from "../../util/workout-service";
import Calendar from "../../components/Calendar/Calendar";
import MonthSpinner from "../../components/MonthSpinner/MonthSpinner";
import AddWorkoutModal from "../../components/Modal/AddWorkoutModal";
import { User } from "../../../models/User";
import { Plan } from "../../../models/Plan";
import { Workout } from "../../../models/Workout";
import "./MainPage.css";

type MainPageProps = {
    user: User;
    planList: Plan[];
};

export default function MainPage({ user, planList } : MainPageProps){
    const [showAddWorkoutButton, setShowAddWorkoutButton] = useState<boolean>(false);
    const [viewDate, setViewDate] = useState<Date>(new Date());

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
    };

    return(
        <div className="mainpage">
            <div className="mainpagecol1">
                <MonthSpinner viewDate={viewDate} setViewDate={setViewDate}/>
                <Button onClick={handleAddWorkoutButton}>Add Workout</Button>
                <AddWorkoutModal planList={planList} addWorkout={addWorkout} showModal={showAddWorkoutButton} setShowModal={setShowAddWorkoutButton}/>
            </div>
            <div className="mainpagecol2">
                <Calendar viewDate={viewDate}/>
            </div>
        </div>
    );
}