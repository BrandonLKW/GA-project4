import { User } from "../../models/User";
import * as userAPI from "./user-api";

export async function login(user: User){
    const res = await userAPI.login(user);
    return res;
}