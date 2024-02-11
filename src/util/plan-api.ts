const BASE_URL = "/api/plan";

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

export async function getAllExerciseByFilter(searchObj: object){
    const res = await fetch(BASE_URL + "/exercises/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchObj),
    })
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Login");
    }
}