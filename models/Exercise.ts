export class Exercise{
    name: string = "";
    muscle_group: string = "";
    description: string = "";
    exercise_id: number = 0;

    constructor(name?: string, muscle_group?:string, description?:string, exercise_id?: number){
        if (name){
            this.name = name;
        }
        if (muscle_group){
            this.muscle_group = muscle_group;
        }
        if (description){
            this.description = description;
        }
        if (exercise_id){
            this.exercise_id = exercise_id;
        }
    }
}