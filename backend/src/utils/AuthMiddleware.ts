import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { jwtDecode } from "jwt-decode"

dotenv.config();

export function auth(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        throw Error;
    }
    const authString = authHeader as string;
    const token = authString.split(" ")[1];
    if(!token){
        throw Error;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if (typeof decoded !== 'string') {
            (req as any).user = decoded;
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: "Token Expired or invalid. Please login again"
        }); 
    }
    
}