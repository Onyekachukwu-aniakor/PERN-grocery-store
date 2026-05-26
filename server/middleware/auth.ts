import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

const auth = (req: Request, res:Response, next: NextFunction)=>{
    try {
        const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: 'No token provided, authorisation denied'})
    }
    //verify the token and take the 2nd part in split
    const token =authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id: string}
    // 'user' is from index.d.ts file under types folder
    req.user = {id:decoded.id}
    next()
    
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:'Token is not valid'})
    }

}

export default auth;

