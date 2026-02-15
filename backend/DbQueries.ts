import { db } from "./Db";

const createUserTable = async () => {
    try {
        db.query(`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(30) UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password VARCHAR(30) NOT NULL,
            theme VARCHAR(5) DEAFULT 'dark',
            created_at CURRENT_TIMESTAMP 
            )`)
    } catch (error) {
        
    }
}