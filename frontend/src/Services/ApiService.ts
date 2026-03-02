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
    const data = await response.json();
    return {
        status: response.status,
        data: data
    }
}

export async function getAllTaskData(){
    const response = await fetch(`${API_URL}/getAllTaskData`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log("XDD");
    console.log(data);
    return {
        status: response.status,
        data: data
    }
}

export async function getTasks(list_id: string){
    const response = await fetch(`${API_URL}/getTasks/${list_id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    const data = await response.json();
    return {
        status: response.status,
        data: data
    }

}