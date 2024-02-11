import * as planAPI from "./plan-api";

export async function getAllExerciseGroups(){
    const res = await planAPI.getAllExerciseGroups();
    return res;
}

export async function getAllExerciseByFilter(searchObj: object){
    const res = await planAPI.getAllExerciseByFilter(searchObj);
    return res;
}