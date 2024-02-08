import { User } from "../../models/User";
const BASE_URL = "/api/user";

export async function login(user: User){
    const res = await fetch(BASE_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })
    console.log("******************",res);
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Login");
    }
}