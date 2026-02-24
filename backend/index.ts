import express, {Request, Response} from "express";
import cors from "cors"
import dotenv from "dotenv";
import { db } from "./Db";
import { createTables } from "./DbQueries";
import type { LoginUser, RegisterUser, List } from "./src/Types/types";
import { hashPassword, comparePasswords } from "./src/utils/funcs";
import { saveUserToDb, findUser, getLists, addList } from "./DbQueries";
import jwt from "jsonwebtoken"
import { auth } from "./src/utils/AuthMiddleware";

dotenv.config();

const app = express();
const PORT = Number(process.env.NODE_PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json("Chyba dziala?")
})

app.post("/api/register", async (req: Request<{}, {}, RegisterUser>, res: Response) => {
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
            message: "Successfully created user. Please log in.",
            user: result.rows[0]
        }); 
    } catch (error: any) {
        if(error.message === "DUPLICATE"){
            res.status(400).json({
                error: "Username or email is already in use."
            })
        }
        console.log(error);
    }
    
})

app.post("/api/login", async (req:Request<{}, {}, LoginUser>, res: Response) => {
    const { email_username, password } = req.body;
    
    try {
        const user = await findUser(email_username);
        console.log(user.username);
        if(!user){
            throw Error;
        }

        const match = await comparePasswords(password, user.password);
        if(match){
            const token = jwt.sign({
                user_id: user.user_id,
                username: user.username,
                email: user.email,
            },
                process.env.JWT_SECRET!,
                {expiresIn: '1h'}
            );
            res.status(201).json({
                message: "Successfully loged in.",
                token: token,
                username: user.username
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
});

app.get("/api/getLists", auth, async (req: Request, res: Response) => {
    const user_id = (req as any).user.user_id;
    try {
        const result = await getLists(user_id);
        console.log(result);
        res.status(201).json({
            message: "Succesfully fetched lists data.",
            data: result
        })
    } catch (error) {
        console.log("Error during getting user Lists.");
        console.log(error);
        res.status(400).json({
            message: "Error during getting user Lists."
        })
    }
});

app.post("/api/addList", auth, async (req: Request<{}, {}, List>, res: Response) => {
    try {
        const { list_id, name, priority, created_at, until, time } = req.body;
        const user_id = (req as any).user.user_id;
        await addList({list_id, name, priority, created_at, until, time}, user_id);
        res.status(201).json({
            message: "Succesfully added new List"
        })
    } catch (error) {
        console.log("Error during adding new list");
        console.log(error);
        res.status(400).json({
            message: "Error during adding new list",
        })
    }
})

app.get("/test", auth, (req: Request, res: Response) => {
    res.json({
        message: "Chyba dziala xd"
    })
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