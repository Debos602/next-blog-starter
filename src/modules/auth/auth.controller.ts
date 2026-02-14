import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginWithEmailAndPassword = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.loginWithEmailAndPassword(req.body);
        res.status(200).json(result);
    } catch
    (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'An error occurred while logging in.' });
    }
};

export const AuthController = {
    loginWithEmailAndPassword
};