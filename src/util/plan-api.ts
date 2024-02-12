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