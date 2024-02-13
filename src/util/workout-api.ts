import { Workout } from "../../models/Workout";

const BASE_URL = "/api/workout";

export async function getWorkoutsByDateRange(user_id: number, startdate: Date, enddate: Date){
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