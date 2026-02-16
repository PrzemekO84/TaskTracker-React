import bcrypt from "bcrypt";
import { db } from "../../Db";

export async function hashPassword(password: string){
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error: any) {
        if (error.code === '23505') { 
            console.log("User already exists in the database.");
        }
        console.log("Error during hashing");
        console.log(error);
    }
}