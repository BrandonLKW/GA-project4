import { Routine } from "./Routine";

export class Plan{
    name: string = "";
    is_template: boolean = false;
    id: number = 0;
    user_id: number = 0;
    routineList: Routine[] = [];
    display_routine: boolean = false;

    constructor(name?: string, is_template?: boolean, id?: number, user_id?: number, routineList?: Routine[], display_routine?: boolean){
        if (name){
            this.name = name;
        }
        if (is_template){
            this.is_template = is_template;
        }
        if (id){
            this.id = id;
        }
        if (user_id){
            this.user_id = user_id;
        }
        if (routineList){
            this.routineList = routineList;
        }
        if (display_routine){
            this.display_routine = display_routine;
        }
    }
}