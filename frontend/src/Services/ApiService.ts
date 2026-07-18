import type { RegisterUser, LoginUser, List } from "@/Types/types";
import axios from "axios";

const API_URL = `http://localhost:3000/api`;

const axiosInter = axios.create({
    baseURL: API_URL,
});

axiosInter.interceptors.request.use((config) => {
    const currentToken = localStorage.getItem("token");
    if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
    }

    return config;
});

axiosInter.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log("Session expired");
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.href = "/Login";
            window.alert("Session has ended please log in again");
        }
        return Promise.reject(error);
    },
);

const token = localStorage.getItem("token");

export async function registerUserApi(userCredentials: RegisterUser) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
    });
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
}

export async function loginUserApi(userCredentials: LoginUser) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
    });
    const data = await response.json();

    return {
        status: response.status,
        data: data,
    };
}

export async function getLists() {
    const response = await axiosInter.get(`${API_URL}/getLists`);

    return {
        status: response.status,
        data: response.data,
    };
}

export async function addList(list: List) {
    
    console.log("Test AddList");
    console.log(list);

    const response = await axiosInter.post(`${API_URL}/addList`, {
        list: list
    });

    return {
        status: response.status,
        data: response.data,
    };
}

export async function editList(list: List, list_id: string){
    const response = await axiosInter.patch(`${API_URL}/editList`);

    return {
        status: response.status,
        data: response.data
    }
}

export async function getAllTaskData() {
    const response = await axiosInter.get(`${API_URL}/getAllTaskData`);

    return {
        status: response.status,
        data: response.data,
    };
}

export async function getTasks(list_id: string) {
    const response = await axiosInter.get(`${API_URL}/getTasks/${list_id}`);

    return {
        status: response.status,
        data: response.data,
    };
}
