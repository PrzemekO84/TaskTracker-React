console.log("test");
import express, {Request, Response} from "express";
import cors from "cors"
import dotenv from "dotenv";
import { db } from "./Db";
import { createTables } from "./DbQueries";
import type { LoginUser, RegisterUser } from "./src/Types/types";
import { hashPassword, comparePasswords } from "./src/utils/funcs";
import { saveUserToDb } from "./DbQueries";
import { findUser } from "./DbQueries";

dotenv.config();

const app = express();
const PORT = Number(process.env.NODE_PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json("Chyba dziala?")
})

app.post("/api/register", async (req: Request<RegisterUser>, res: Response) => {
    const {username, email, password} = req.body;

    try {
        const hashedPassword = await hashPassword(password);

        if (!hashedPassword) {
            return res.status(500).json({ 
                error: "Error during hashing the password" 
            });
        }

        const result = await saveUserToDb(username, email, hashedPassword);
        if (!result) {
            return res.status(400).json({ 
                error: "Not able to save a user to the database" 
            });
        }

        res.status(201).json({
            message: "Successfully created user.",
            user: result.rows[0]
        }); 
    } catch (error: any) {
        if(error.message === "DUPLICATE"){
            res.status(400).json({
                error: "Username or email is already in use."
            })
        }
    }
    
})

app.post("/api/login", async (req:Request<LoginUser>, res: Response) => {
    const { email_username, password } = req.body;
    
    try {
        const hashedPassword = await findUser(email_username);
        if(!hashedPassword){
            throw Error;
        }
        const match = await comparePasswords(password, hashedPassword.password);
        if(match){
            res.status(201).json({
                message: "Successfully loged in."
            })
        }
        else{
            throw Error;
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "Incorrect Credentials."
        })
    }
})

app.listen(PORT, async () => {
    try{
        await db.connect();
        console.log(`Succesfully connected to the database.`);
        console.log(`Server running on port: ${PORT}`);
        await createTables();
    }
    catch (err){
        console.log(err);
    }
})