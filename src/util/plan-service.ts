import * as planAPI from "./plan-api";

export async function getAllTemplatePlans(){
    const res = await planAPI.getAllTemplatePlans();
    return res;
}

export async function getAllUserPlans(user_id: number){
    const res = await planAPI.getAllUserPlans(user_id);
    return res;
}

export async function getRoutinesByPlan(plan_id: number){
    const res = await planAPI.getRoutinesByPlan(plan_id);
    return res;
}

export async function getAllExerciseGroups(){
    const res = await planAPI.getAllExerciseGroups();
    return res;
}

export async function getExerciseById(exercise_id: number){
    const res = await planAPI.getExerciseById(exercise_id);
    return res;
}

export async function getAllExerciseByFilter(searchObj: object){
    const res = await planAPI.getAllExerciseByFilter(searchObj);
    return res;
}