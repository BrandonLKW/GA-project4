export class User {
    name: string = "";
    email: string = "";
    password: string = "";
    start_height: number = 0;
    start_weight: number = 0;
    is_premium: boolean = false;
    id: number = 0;

    constructor(name?: string, email?:string, password?:string, start_height?:number, start_weight?:number, is_premium?: boolean, id?: number){
        if (name){
            this.name = name;
        }
        if (email){
            this.email = email;
        }
        if (password){
            this.password = password;
        }
        if (start_height){
            this.start_height = start_height;
        }
        if (start_weight){
            this.start_weight = start_weight;
        }
        if (is_premium){
            this.is_premium = is_premium;
        }
        if (id){
            this.id = id;
        }
    }
}

//https://www.typescriptlang.org/docs/handbook/2/classes.html