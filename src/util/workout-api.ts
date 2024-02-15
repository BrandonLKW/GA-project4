import { Workout } from "../../models/Workout";

const BASE_URL = "/api/workout";

export async function getWorkoutsByDateRange(user_id: number, startdate: string, enddate: string){
    const res = await fetch(BASE_URL + "/date", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"user_id": user_id, "startdate": startdate, "enddate": enddate}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function getWorkoutRoutinesByWorkout(workout_id: number){
    const res = await fetch(BASE_URL + "/routine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"workout_id": workout_id }),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function getBmiDataByFilters(startDate: string, endDate: string, user_id: number){
    const res = await fetch(BASE_URL + "/filter/bmi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"startdate": startDate, "enddate": endDate, "user_id": user_id}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function getExerciseDataByFilters(startDate: string, endDate: string, user_id: number, exercise_id: string){
    const res = await fetch(BASE_URL + "/filter/exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"startdate": startDate, "enddate": endDate, "user_id": user_id, "exercise_id": exercise_id}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function getDurationDataByFilters(startDate: string, endDate: string, user_id: number){
    const res = await fetch(BASE_URL + "/filter/duration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"startdate": startDate, "enddate": endDate, "user_id": user_id}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function addWorkouts(workout: Workout[]){
    const res = await fetch(BASE_URL + "/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workout),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function updateWorkout(workout: Workout){
    const res = await fetch(BASE_URL + "/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workout),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}