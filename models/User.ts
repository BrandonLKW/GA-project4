export class User {
    name: string = "";
    email: string = "";
    password: string = "";
    start_height: number = 0;
    start_weight: number = 0;
    is_admin: boolean = false;
    user_id: number = 0;

    constructor(name?: string, email?:string, password?:string, start_height?:number, start_weight?:number, is_admin?: boolean, user_id?: number){
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
        if (is_admin){
            this.is_admin = is_admin;
        }
        if (user_id){
            this.user_id = user_id;
        }
    }
}

//https://www.typescriptlang.org/docs/handbook/2/classes.html