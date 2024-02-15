import * as planAPI from "./plan-api";
import { Routine } from "../../models/Routine";
import { Exercise } from "../../models/Exercise";

export async function getAllTemplatePlans(){
    const res = await planAPI.getAllTemplatePlans();
    return res;
}

export async function getAllUserPlans(user_id: number){
    const res = await planAPI.getAllUserPlans(user_id);
    return res;
}

export async function addUserPlan(name: string, user_id: number){
    const res = await planAPI.addUserPlan(name, user_id);
    return res;
}

export async function getRoutinesByPlan(plan_id: number){
    const res = await planAPI.getRoutinesByPlan(plan_id);
    return res;
}

export async function addUserRoutine(routine: Routine){
    const res = await planAPI.addUserRoutine(routine);
    return res;
}

export async function updateUserRoutine(routine: Routine){
    const res = await planAPI.updateUserRoutine(routine);
    return res;
}

export async function deleteUserRoutine(plan_id: number){
    const res = await planAPI.deleteUserRoutine(plan_id);
    return res;
}

export async function getAllExercises(){
    const res = await planAPI.getAllExercises();
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

export async function addExercise(exercise: Exercise){
    const res = await planAPI.addExercise(exercise);
    return res;
}

export async function updateExercise(exercise: Exercise){
    const res = await planAPI.updateExercise(exercise);
    return res;
}

export async function deleteExercise(exercise_id: number){
    const res = await planAPI.deleteExercise(exercise_id);
    return res;
}