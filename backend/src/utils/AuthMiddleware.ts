import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

export function auth(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(400).json({
            error: "Please sign in or create new account."
        })
    }
    const authString = authHeader as string;
    const token = authString.split(" ")[1];
    if(!token){
        return res.status(400).json({
            error: "Please sign in or create new account."
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if (typeof decoded !== 'string') {
            (req as any).user = decoded;
        }
        console.log(decoded);
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "Error during authentication please try to login again."
        }); 
    }
    
}