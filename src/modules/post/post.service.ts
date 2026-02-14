import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const CreatePost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    const result = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        },
    });
    return result;
};

const getAllPosts = async ({ page = 1, limit = 10, search, isFeatured, tags }: {
    page?: number, limit?: number, search?: string, isFeatured?: boolean, tags?: string[];
}) => {
    const skip = (page - 1) * limit;
    console.log("tags", { tags });
    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ]
            },
            typeof isFeatured === "boolean" && { isFeatured },
            tags && tags.length > 0 && {
                tags: {
                    hasSome: tags
                }
            }

        ].filter(Boolean) // Remove falsy values
    };
    const result = await prisma.post.findMany(
        {
            skip,
            take: limit,
            where
        }
    );
    return result;
};

const getPostById = async (id: number): Promise<Post | null> => {
    const result = await prisma.post.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        },
    });
    return result;
};

const updatePost = async (id: number, payload: Prisma.PostUpdateInput): Promise<Post> => {
    console.log('Updating post with ID:', id, 'and data:', payload);

    const result = await prisma.post.update({
        where: { id },
        data: payload,
    });
    return result;

};

const deletePost = async (id: number): Promise<Post> => {
    const result = await prisma.post.delete({
        where: { id },
    });
    return result;
};

export const PostService = {
    CreatePost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost

};