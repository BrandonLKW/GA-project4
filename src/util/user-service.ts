import { User } from "../../models/User";
import * as userAPI from "./user-api";

export async function login(user: User){
    const res = await userAPI.login(user);
    return res;
}

export async function signup(user: User){
    const res = await userAPI.signup(user);
    return res;
}