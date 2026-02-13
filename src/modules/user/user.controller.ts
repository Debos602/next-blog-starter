import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body);
        res.send(result);
    } catch (error) {
        console.error('Error creating user:', error);

    }
};

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllFromDb();
        res.send(result);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const UserController = {
    createUser,
    getAllUser
};