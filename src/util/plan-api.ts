import { Exercise } from "../../models/Exercise";
import { Routine } from "../../models/Routine";

const BASE_URL = "/api/plan";

export async function getAllTemplatePlans(){
    const res = await fetch(BASE_URL + "/template", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function getAllUserPlans(user_id: number){
    const res = await fetch(BASE_URL + "/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"user_id": user_id}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function addUserPlan(name: string, user_id: number){
    const res = await fetch(BASE_URL + "/user/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"name": name, "user_id": user_id}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function getRoutinesByPlan(plan_id: number){
    const res = await fetch(BASE_URL + "/routines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"plan_id": plan_id}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function addUserRoutine(routine: Routine){
    const res = await fetch(BASE_URL + "/routines/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(routine),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function updateUserRoutine(routine: Routine){
    const res = await fetch(BASE_URL + "/routines/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(routine),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function deleteUserRoutine(routine_id: number){
    const res = await fetch(BASE_URL + "/routines/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"plan_id": routine_id}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function getAllExercises(){
    const res = await fetch(BASE_URL + "/exercises", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function getAllExerciseGroups(){
    const res = await fetch(BASE_URL + "/exercises/groups", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function getExerciseById(exercise_id: number){
    const res = await fetch(BASE_URL + "/exercises/id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"exercise_id": exercise_id}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function getAllExerciseByFilter(searchObj: object){
    const res = await fetch(BASE_URL + "/exercises/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchObj),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function addExercise(exercise: Exercise){
    const res = await fetch(BASE_URL + "/exercises/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exercise),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function updateExercise(exercise: Exercise){
    const res = await fetch(BASE_URL + "/exercises/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exercise),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}

export async function deleteExercise(exercise_id: number){
    const res = await fetch(BASE_URL + "/exercises/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"exercise_id": exercise_id}),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Call");
    }
}    