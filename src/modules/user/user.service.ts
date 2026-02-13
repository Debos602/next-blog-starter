import { Prisma, User } from '@prisma/client';
import { prisma } from './../../config/db';


const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    console.log('Creating user with data:', { payload });

    const createUser = await prisma.user.create({
        data: payload,
    });
    return createUser;
};

const getAllFromDb = async () => {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            status: true,
            posts: true
        },
        orderBy: {
            createdAt: 'desc'
        },

    });
    return result;
};

const getUserById = async (id: number) => {
    const result = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            status: true,
            posts: true
        }
    });
    return result;
};

const updateUser = async (id: number, payload: Prisma.UserUpdateInput) => {
    const result = await prisma.user.update({
        where: { id },
        data: payload,
    });
    return result;
};
const deleteUser = async (id: number) => {
    const result = await prisma.user.delete({
        where: { id },
    });
    return result;
};

export const userService = {
    createUser,
    getAllFromDb,
    getUserById,
    updateUser,
    deleteUser
};