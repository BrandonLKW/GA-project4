import { Exercise } from "./Exercise";

export class Routine{
    seq: number = 0;
    reps: number = 0;
    duration: number = 0;
    weight: number = 0;
    routine_id: number = 0;
    exercise_id: number = 0;
    exercise: Exercise = new Exercise();
    plan_id: number = 0;

    constructor(seq?: number, reps?: number, duration?: number, weight?: number, routine_id?: number, exercise_id?: number, exercise?: Exercise, plan_id?: number){
        if (seq){
            this.seq = seq;
        }
        if (reps){
            this.reps = reps;
        }
        if (duration){
            this.duration = duration;
        }
        if (weight){
            this.weight = weight;
        }
        if (routine_id){
            this.routine_id = routine_id;
        }
        if (exercise_id){
            this.exercise_id = exercise_id;
        }
        if (exercise){
            this.exercise = exercise;
        }
        if (plan_id){
            this.plan_id = plan_id;
        }
    }
}