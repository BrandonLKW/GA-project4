import { Workout } from "../../models/Workout";
import * as workoutAPI from "./workout-api";

export async function getWorkoutsByDateRange(user_id: number, startdate: string, enddate: string){
    const res = await workoutAPI.getWorkoutsByDateRange(user_id, startdate, enddate);
    return res;
}

export async function getWorkoutRoutinesByWorkout(workout_id: number){
    const res = await workoutAPI.getWorkoutRoutinesByWorkout(workout_id);
    return res;
}

export async function getBmiDataByFilters(startDate: string, endDate: string, user_id: number){
    const res = await workoutAPI.getBmiDataByFilters(startDate, endDate, user_id);
    return res;
}

export async function getExerciseDataByFilters(startDate: string, endDate: string, user_id: number, exercise_id: string){
    const res = await workoutAPI.getExerciseDataByFilters(startDate, endDate, user_id, exercise_id);
    return res;
}

export async function getDurationDataByFilters(startDate: string, endDate: string, user_id: number){
    const res = await workoutAPI.getDurationDataByFilters(startDate, endDate, user_id);
    return res;
}

export async function addWorkouts(workout: Workout[]){
    const res = await workoutAPI.addWorkouts(workout);
    return res;
}

export async function updateWorkout(workout: Workout){
    const res = await workoutAPI.updateWorkout(workout);
    return res;
}