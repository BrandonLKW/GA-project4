import { useEffect, useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import CalendarDayBox from "./CalendarDayBox";
import "./Calendar.css";
import MonthSpinner from "../MonthSpinner/MonthSpinner";

type CalendarProps = {
    
};

export default function Calendar({  } : CalendarProps){
    const [viewDate, setViewDate] = useState<Date>(new Date());
    const [calendarDays, setCalendarDays] = useState<Date[]>([]);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    useEffect(() => {
        const newCalendarDaysList = [];
        //Load initial list based on current date
        const firstDayOfMonthIndex = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay(); //0 -> Sun
        const numOfDaysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate(); //https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
        //Determine initial place in first row
        for (let i = 0; i < firstDayOfMonthIndex; i++){
            newCalendarDaysList.push(new Date(0));
        }
        //Populate based on days in the month
        for (let i = 1; i <= numOfDaysInMonth; i++){
            const dayDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), i);
            newCalendarDaysList.push(dayDate);
        }
        setCalendarDays(newCalendarDaysList);
    }, [viewDate]);

    return (
        <div className="calendar">
            <div className="calendarSidePanel">
                <MonthSpinner viewDate={viewDate} setViewDate={setViewDate}/>
                <Button>Add Workout</Button>
            </div>
            <div className="calendarHeader">
                {weekdays.map((day) => (<h3>{day}</h3>))}
            </div>
            <div className="calendarBody">
                {calendarDays.map((day) => (<CalendarDayBox date={day}/>))}
            </div>
        </div>
    );
}