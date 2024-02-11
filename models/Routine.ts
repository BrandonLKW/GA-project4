export class Routine{
    seq: number = 0;
    reps: number = 0;
    duration: number = 0;
    weight: number = 0;
    id: number = 0;
    exercise_id: number = 0;
    plan_id: number = 0;

    constructor(seq?: number, reps?: number, duration?: number, weight?: number, id?: number, exercise_id?: number, plan_id?: number){
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
        if (id){
            this.id = id;
        }
        if (exercise_id){
            this.exercise_id = exercise_id;
        }
        if (plan_id){
            this.plan_id = plan_id;
        }
    }
}