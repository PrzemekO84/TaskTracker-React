console.log("test");
import express, {Request, Response} from "express";
import cors from "cors"
import dotenv from "dotenv";
import { db } from "./Db";
import { createTables } from "./DbQueries";
import type { RegisterUser } from "./src/Types/types";
import { hashPassword } from "./src/utils/funcs";
import { saveUserToDb } from "./DbQueries";

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

    const hashedPassword = await hashPassword(password);

    if(!hashedPassword){
        throw new Error("Error during hashing.")
    }

    const result = await saveUserToDb(username, email, hashedPassword);

    res.status(201).json({
        message: "Sucessfully created user",
        user: result?.rows[0]
    })    
})

app.listen(PORT, async () => {
    try{
        await db.connect();
        console.log(`Succesfully connected to the database.`);
        console.log(`Server running on port: ${PORT}`);
        createTables();
    }
    catch (err){
        console.log(err);
    }
})