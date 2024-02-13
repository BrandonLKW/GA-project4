import { useState } from "react";
import { Button } from "@mui/material";
import Calendar from "../../components/Calendar/Calendar";
import MonthSpinner from "../../components/MonthSpinner/MonthSpinner";
import { User } from "../../../models/User";
import { Plan } from "../../../models/Plan";
import "./MainPage.css";

type MainPageProps = {
    user: User;
    planList: Plan[];
};

export default function MainPage({ user, planList } : MainPageProps){
    const [viewDate, setViewDate] = useState<Date>(new Date());

    return(
        <div className="mainpage">
            <div className="mainpagecol1">
                <MonthSpinner viewDate={viewDate} setViewDate={setViewDate}/>
                <Button>Add Workout</Button>
            </div>
            <div className="mainpagecol2">
                <Calendar viewDate={viewDate}/>
            </div>
        </div>
    );
}