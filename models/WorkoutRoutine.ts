import { Exercise } from "./Exercise";

export class WorkoutRoutine{
    seq: number = 0;
    reps: number = 0;
    duration: number = 0;
    weight: number = 0;
    exercise_id: number = 0;
    workout_id: number = 0;
    wr_id: number = 0;
    exercise: Exercise = new Exercise();

    constructor(seq?: number, reps?: number, duration?: number, weight?: number, exercise_id?: number, workout_id?: number, wr_id?: number, exercise?: Exercise){
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
        if (exercise_id){
            this.exercise_id = exercise_id;
        }
        if (workout_id){
            this.workout_id = workout_id;
        }
        if (wr_id){
            this.wr_id = wr_id;
        }
        if (exercise){
            this.exercise = exercise;
        }
    }
}