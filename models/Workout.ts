import { WorkoutRoutine } from "./WorkoutRoutine";

export class Workout {
    workout_date: Date = new Date();
    body_weight: number = 0;
    status: string = "";
    notes: string = "";
    plan_name: string = "";
    workout_id: number = 0;
    user_id: number = 0;
    routineList: WorkoutRoutine[] = [];
    display_workout: boolean = false;

    constructor(workout_date?: Date, body_weight?:number, status?:string, notes?:string, plan_name?:string, workout_id?: number, user_id?: number){
        if (workout_date){
            this.workout_date = workout_date;
        }
        if (body_weight){
            this.body_weight = body_weight;
        }
        if (status){
            this.status = status;
        }
        if (notes){
            this.notes = notes;
        }
        if (plan_name){
            this.plan_name = plan_name;
        }
        if (workout_id){
            this.workout_id = workout_id;
        }
        if (user_id){
            this.user_id = user_id;
        }
    }
}