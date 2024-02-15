import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';
import "./MetricsSearch.css";

type MetricsSearchProps = {
    loadTrackBmi: (startDate: Dayjs, endDate: Dayjs) => void;
    loadTrackDuration: (startDate: Dayjs, endDate: Dayjs) => void;
};

export default function MetricsSearch({ loadTrackBmi, loadTrackDuration } : MetricsSearchProps){
    const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date()));
    const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date()));

    const handleBmiClick = () => {
        loadTrackBmi(startDate, endDate);
    };

    const handleDurationClick = () => {
        loadTrackDuration(startDate, endDate);
    };

    return (
        <div className="metricssearchbody">
            <Typography>Select Date range:</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => {
                        if (newValue){
                            setStartDate(newValue);
                        }
                    }}/>
                <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => {
                        if (newValue){
                            setEndDate(newValue);
                        }
                    }}/>
            </LocalizationProvider>
            <Button variant="contained" onClick={handleBmiClick}>Track Body Weight</Button>
            <Button variant="contained" onClick={handleDurationClick}>Track Workout Duration</Button>
        </div>
    );
}