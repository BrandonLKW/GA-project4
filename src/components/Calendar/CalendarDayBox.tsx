import { useEffect, useState } from "react";
import "./Calendar.css";

type CalendarDayBoxProps = {
    date: Date;
};

export default function CalendarDayBox({ date } : CalendarDayBoxProps){
    const day = date.getTime() === 0 ? 0 : date.getDate();

    if (day === 0){
        return (<label className="hidden">empty</label>);
    } else{
        return (
            <div>
                <h1>{day}</h1>
            </div>
        );
    }
}