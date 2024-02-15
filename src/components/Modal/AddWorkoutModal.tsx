import { useState } from "react";
import { Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, MenuItem, TextField, Select, SelectChangeEvent, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";
import { Plan } from "../../../models/Plan";
import { Workout } from "../../../models/Workout";
import { WorkoutRoutine } from "../../../models/WorkoutRoutine";
import "./Modal.css";

type AddWorkoutModalProps = {
    planList: Plan[];
    addWorkout: (workoutList: Workout[]) => void;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
};
dayjs.extend(utc);
dayjs.extend(timezone);

export default function AddWorkoutModal({ planList, addWorkout, showModal, setShowModal } : AddWorkoutModalProps){
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [selectedPlan, setSelectedPlan] = useState<Plan>(new Plan());
    const [selectedPlanId, setSelectedPlanId] = useState<string>("");
    const [workoutStatus, setWorkoutStatus] = useState<string>("");
    const [bodyWeight, setBodyWeight] = useState<string>("");
    const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date()));
    const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date()));
    const workoutStatusList: string[] = ["Completed", "Planned"];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowError(false);
        setErrorMessage("");
        //basic input checks
        if (endDate.isBefore(startDate)){
            setShowError(true);
            setErrorMessage("End Date cannot be before Start Date.");
            return;
        }
        const newWorkoutList = [];
        //Based on date range, create individual workout rows
        let currentDate = dayjs(startDate).tz("Asia/Kuala_Lumpur").set("hour", 0).set("minute", 0).set("second", 0);
        while (!currentDate.isAfter(endDate.tz("Asia/Kuala_Lumpur").set("hour", 0).set("minute", 0).set("second", 0))){
            const newWorkout = new Workout(currentDate, parseFloat(bodyWeight), workoutStatus, "", selectedPlan.name);
            const newWorkoutRoutineList = [];
            for (const routine of selectedPlan.routineList){
                const newWorkoutRoutine = new WorkoutRoutine(routine.seq, routine.reps, routine.duration, routine.weight, routine.exercise_id);
                newWorkoutRoutineList.push(newWorkoutRoutine);
            }
            newWorkout.routineList = newWorkoutRoutineList;
            newWorkout.workout_date_str = currentDate.tz("Asia/Kuala_Lumpur").format("YYYY-MM-DD");
            newWorkoutList.push(newWorkout);
            currentDate = currentDate.add(1, "day");
        }
        addWorkout(newWorkoutList);
    }

    const handlePlanChange = (event: SelectChangeEvent) => {
        const newSelectedId = parseInt(event.target.value);
        setSelectedPlan(planList.filter((plan) => {
            if (plan.plan_id === newSelectedId){
                return plan;
            }
        })[0]);
        setSelectedPlanId(event.target.value);
    }

    const handleStatusChange = (event: SelectChangeEvent) => {
        setWorkoutStatus(event.target.value);
    }

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBodyWeight(event.target.value);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return(
        <>
            <Dialog
                open={showModal}
                onClose={handleClose}
                PaperProps={{
                component: 'form',
                onSubmit: handleSubmit
                }}>
                <DialogTitle>Add New Workout to Calendar Schedule</DialogTitle>
                <DialogContent className="addNewWorkout">
                    <div className="addNewWorkoutInfo">
                        <FormControl variant="standard">
                            <InputLabel id="plan-label">Plan</InputLabel>
                            <Select 
                                name="planid"
                                labelId="plan-label"
                                value={selectedPlanId}
                                onChange={handlePlanChange}>
                                {planList?.map((plan) => (<MenuItem key={plan.plan_id} value={plan.plan_id}>{plan.name}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select 
                                name="planid"
                                labelId="status-label"
                                value={workoutStatus}
                                onChange={handleStatusChange}>
                                {workoutStatusList?.map((status) => (<MenuItem key={status} value={status}>{status}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <TextField label="Track Body Weight (kg)" variant="outlined" value={bodyWeight} disabled={workoutStatus !== "Completed"} onChange={handleWeightChange}/>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                value={startDate} 
                                format="DD-MM-YYYY" 
                                onChange={(newValue) => {
                                    if (newValue){
                                        setStartDate(newValue);
                                    }
                                }}/>
                            <DatePicker
                                label="End Date"
                                value={endDate} 
                                format="DD-MM-YYYY" 
                                onChange={(newValue) => {
                                    if (newValue){
                                        setEndDate(newValue);
                                    }
                                }}/>
                        </LocalizationProvider>
                    </div>
                    {selectedPlan.plan_id > 0 
                    ? 
                    <div className="addNewWorkoutRoutines">
                        <Typography>Routines:</Typography>
                        {selectedPlan?.routineList?.map((routine) => (<Typography>- {routine.exercise.name}</Typography>))}
                    </div> 
                    : 
                    <></>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add Workout</Button>
                </DialogActions>
                <Alert variant="outlined" severity="error" sx={{display: showError ? "" : "none"}}>
                    {errorMessage}
                </Alert>
            </Dialog>
        </>
    );
}