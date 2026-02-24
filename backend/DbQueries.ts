import { QueryResult } from "pg";
import { db } from "./Db";
import { List } from "./src/Types/types";

export const createTables = async () => {

    const usersTable = `CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(30) UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL, 
        theme VARCHAR(10) DEFAULT 'dark',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    )`;

    const monthlyStats = `CREATE TABLE IF NOT EXISTS monthly_stats (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        year INTEGER NOT NULL,
        month INTEGER NOT NULL,
        count INTEGER DEFAULT 0,
        UNIQUE (user_id, year, month)
    )`;

    const listTable = `CREATE TABLE IF NOT EXISTS lists (
        list_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        name VARCHAR(25) NOT NULL,
        priority VARCHAR(10) DEFAULT 'Low',
        created_at DATE DEFAULT CURRENT_DATE,
        until DATE,
        time TIME
    )`;

    const taskTable = `CREATE TABLE IF NOT EXISTS tasks (
        task_id SERIAL PRIMARY KEY,
        list_id INTEGER REFERENCES lists(list_id) ON DELETE CASCADE,
        name VARCHAR(50) NOT NULL,
        priority VARCHAR(10) DEFAULT 'Low',
        created_at DATE DEFAULT CURRENT_DATE,
        until DATE,
        time TIME,
        completed BOOLEAN DEFAULT FALSE
    )`;

    try {

        await db.query(usersTable);
        console.log("Created Users Table");

        await db.query(monthlyStats);
        console.log("Created Monthly Data Table");

        await db.query(listTable);
        console.log("Created List Table");

        await db.query(taskTable);
        console.log("Created Task Table");

    } catch (error) {
        console.log("Error during creating tables");
        console.log(error);
    }
}

export const saveUserToDb = async (username: string, email:string, password: string) => {
    try {
        const result = await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email",
            [username, email, password]
        );
        console.log("Succesfully saved user into the database.");
        return result;
    } catch (error: any) {
        if(error.code === "23505"){
            throw new Error("DUPLICATE");
        }
        throw Error("Error during saving the user.")
    }
}

export const findUser = async (email_username: string) => {
    const result = await db.query("SELECT password, user_id, username, email FROM users WHERE username = $1 OR email = $1",
        [email_username]
    )

    if (result.rows.length === 0) {
        throw new Error("User not found");
    }

    return result.rows[0];

}

export const getLists = async (user_id: string) => {
    const result = await db.query("SELECT * from lists WHERE user_id = $1",
        [user_id]
    )

    return result.rows;
}
 
export const addList = async (list: List, user_id: string) => {
    await db.query("INSERT INTO lists (list_id, user_id, name, priority, created_at, until, time) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [list.list_id, user_id, list.name, list.priority, list.created_at, list.until, list.time]
    )
}
