import { Workout } from "../../models/Workout";
import * as workoutAPI from "./workout-api";

export async function getWorkoutsByDateRange(user_id: number, startdate: Date, enddate: Date){
    const res = await workoutAPI.getWorkoutsByDateRange(user_id, startdate, enddate);
    return res;
}

export async function addWorkouts(workout: Workout[]){
    const res = await workoutAPI.addWorkouts(workout);
    return res;
}