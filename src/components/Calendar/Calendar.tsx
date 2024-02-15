import { useEffect, useState } from "react";
import CalendarDayBox from "./CalendarDayBox";
import "./Calendar.css";
import dayjs, { Dayjs } from 'dayjs';
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";

type CalendarProps = {
    viewDate: Dayjs;
};
dayjs.extend(utc);
dayjs.extend(timezone);

export default function Calendar({ viewDate } : CalendarProps){
    const [calendarDays, setCalendarDays] = useState<Dayjs[]>([]);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    useEffect(() => {
        const newCalendarDaysList = [];
        //Load initial list based on current date
        const firstDayOfMonthIndex = viewDate.startOf("month").day(); //0 -> Sun
        const numOfDaysInMonth = viewDate.daysInMonth(); 
        //Determine initial place in first row
        for (let i = 0; i < firstDayOfMonthIndex; i++){
            newCalendarDaysList.push(dayjs(new Date(0)));
        }
        //Populate based on days in the month
        let runningDate = viewDate.startOf("month");
        for (let i = 0; i < numOfDaysInMonth; i++){
            const dayDate = runningDate.add(i, "day");
            newCalendarDaysList.push(dayDate);
        }
        setCalendarDays(newCalendarDaysList);
    }, [viewDate]);

    return (
        <div className="calendar">
            <div className="calendarHeader">
                {weekdays.map((day) => (<h3>{day}</h3>))}
            </div>
            <div className="calendarBody">
                {calendarDays.map((day) => (<CalendarDayBox date={day}/>))}
            </div>
        </div>
    );
}