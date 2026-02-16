import { db } from "./Db";

export const createTables = async () => {

    const usersTable = `CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(30) UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL, 
        theme VARCHAR(10) DEFAULT 'dark',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    )`;

    const userStats = `CREATE TABLE IF NOT EXISTS stats (
        stat_id SERIAL PRIMARY KEY, 
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        total_tasks INTEGER DEFAULT 0,
        critical_tasks INTEGER DEFAULT 0,
        high_tasks INTEGER DEFAULT 0,
        medium_tasks INTEGER DEFAULT 0,
        low_tasks INTEGER DEFAULT 0
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

        await db.query(userStats);
        console.log("Created User Stats Table");

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
        await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
            [username, email, password]
        );
        console.log("Succesfully saved user into the database.");
    } catch (error) {
        console.log("Error during saving user into database");
        console.log(error);
    }
}