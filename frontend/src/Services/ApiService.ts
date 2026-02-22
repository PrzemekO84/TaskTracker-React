import type { RegisterUser, LoginUser } from "@/Types/types";

const API_URL = `http://localhost:3000/api`;

export async function registerUserApi(userCredentials: RegisterUser){
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userCredentials)
    })
    const data = await response.json();
    return {
        status: response.status,
        data: data
    }
};

export async function loginUserApi(userCredentials: LoginUser){
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userCredentials)
    });
    const data = await response.json();
    return {
        status: response.status,
        data: data
    }
}