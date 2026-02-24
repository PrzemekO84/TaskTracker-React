import type { RegisterUser, LoginUser, List } from "@/Types/types";


const API_URL = `http://localhost:3000/api`;

const token = localStorage.getItem('token');

// const response = await fetch('/api/tasks', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}` // <--- OTO TWOJA KOPERTA!
//   },
// });

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

export async function getLists(){
    const response = await fetch(`${API_URL}/getLists`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();
    return {
        status: response.status,
        data: data
    }
}

export async function addList(list: List){
    const response = await fetch(`${API_URL}/addList`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(list)
    })
    const data = response.json();
    return {
        status: response.status,
        data: data
    }
}