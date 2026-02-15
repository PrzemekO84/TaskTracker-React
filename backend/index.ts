console.log("test");
import express, {Request, Response} from "express";
import cors from "cors"
import dotenv from "dotenv";
import { db } from "./Db";

dotenv.config();

const app = express();
const PORT = Number(process.env.NODE_PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json("Chyba dziala?")
})

app.listen(PORT, async () => {
    try{
        await db.connect();
        console.log(`Succesfully connected to the database.`);
        console.log(`Server running on port: ${PORT}`);
    }
    catch (err){
        console.log(err);
    }
})