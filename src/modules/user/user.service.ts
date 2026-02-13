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
    const result = await prisma.user.findMany();
    return result;
};


export const userService = {
    createUser,
    getAllFromDb
};