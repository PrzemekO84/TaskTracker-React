import bcrypt from "bcrypt";
import { db } from "../../Db";

export async function hashPassword(password: string){
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error: any) {
        console.log("Error during hashing");
        console.log(error);
    }
}

export async function comparePasswords(password: string, hashedPassword: string){
    try {
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    } catch (err) {
        console.log(err);
        throw new Error("Password comparison failed");
    }

}