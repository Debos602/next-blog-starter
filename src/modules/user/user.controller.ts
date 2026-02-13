import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body);

        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
};

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllFromDb();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'An error occurred while fetching users.' });
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUserById(Number(req.params.id));
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'An error occurred while fetching the user.' });
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.updateUser(Number(req.params.id), req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'An error occurred while updating the user.' });
    }
};
const deleteUser = async (req: Request, res: Response) => {
    try {
        await userService.deleteUser(Number(req.params.id));
        res.status(200).json({
            success: true,
            message: 'User deleted successfully.',
            data: null
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
};

export const UserController = {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
};