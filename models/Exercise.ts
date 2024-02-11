export class Exercise{
    name: string = "";
    muscle_group: string = "";
    description: string = "";
    id: number = 0;

    constructor(name?: string, muscle_group?:string, description?:string, id?: number){
        if (name){
            this.name = name;
        }
        if (muscle_group){
            this.muscle_group = muscle_group;
        }
        if (description){
            this.description = description;
        }
        if (id){
            this.id = id;
        }
    }
}