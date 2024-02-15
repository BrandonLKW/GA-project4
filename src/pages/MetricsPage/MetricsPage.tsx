import { useContext, useState } from "react";
import { UserContext } from "../App/App";
import { Typography } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";
import MetricsSearch from "../../components/MetricsSearch/MetricsSearch";
import { LineChart } from '@mui/x-charts/LineChart';
import { getBmiDataByFilters, getDurationDataByFilters } from "../../util/workout-service";
import "./MetricsPage.css";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function MetricsPage(){
    const [lineXAxis, setLineXAxis] = useState<string[]>(["0"]);
    const [lineSeries, setLineSeries] = useState<number[]>([0]);
    const [lineLabel, setLineLabel] = useState<string>("");
    const user = useContext(UserContext);

    const loadTrackBmi = async (startDate: Dayjs, endDate: Dayjs) => {
        const response = await getBmiDataByFilters(startDate.tz("Asia/Kuala_Lumpur").format("YYYY-MM-DD"), endDate.tz("Asia/Kuala_Lumpur").format("YYYY-MM-DD"), user.user_id);
        await loadLineChart(response);
        setLineLabel("Weight");
    };

    const loadTrackDuration = async (startDate: Dayjs, endDate: Dayjs) => {
        const response = await getDurationDataByFilters(startDate.tz("Asia/Kuala_Lumpur").format("YYYY-MM-DD"), endDate.tz("Asia/Kuala_Lumpur").format("YYYY-MM-DD"), user.user_id);
        await loadLineChart(response);
        setLineLabel("Exercise Duration");
    }

    const loadLineChart = async (response: any) => {
        if (response){
            const xAxis = [];
            const lineData = [];
            let prevYData = 0; // use this for missing references
            for (const row of response){
                const workoutDate = dayjs(row.day).tz("Asia/Kuala_Lumpur");
                xAxis.push(workoutDate.format("MM-DD"))
                const yData = parseFloat(row.coalesce);
                if (yData <= 0){
                    lineData.push(prevYData);
                } else{
                    prevYData = yData;
                    lineData.push(yData);
                }
            }
            setLineXAxis(xAxis);
            setLineSeries(lineData);
        } else{
            setLineXAxis([]);
            setLineSeries([]);
        }
    }

    return(
        <div className="metricspage">
            <div className="metricspagecol1">
                <MetricsSearch loadTrackBmi={loadTrackBmi} loadTrackDuration={loadTrackDuration}/>
            </div>
            <div className="metricspagecol2">
                {lineLabel ? 
                <div>
                    <LineChart 
                    xAxis={[{ scaleType: 'point', data: lineXAxis }]} 
                    series={[{ data: lineSeries, label: lineLabel }]} 
                    width={500} 
                    height={300}/>
                </div> 
                :
                <div>
                    <Typography variant="h4">Select a Date range and action to load some statistics!</Typography>
                </div> }
                
            </div>
        </div>
    );
}