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

const getAllPosts = async ({ page = 1, limit = 10, search, isFeatured, tags, sortBy = '', sortOrder = 'desc' }: {
    page?: number, limit?: number, search?: string, isFeatured?: boolean, tags?: string[], sortBy?: string, sortOrder?: 'asc' | 'desc';
}) => {
    const skip = (page - 1) * limit;
    console.log("tags", { sortBy, sortOrder });
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
            },


        ].filter(Boolean) // Remove falsy values
    };
    const result = await prisma.post.findMany(
        {
            skip,
            take: limit,
            where,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    }
                }
            },
            orderBy: {
                [sortBy]: sortOrder
            }
        }
    );

    const total = await prisma.post.count({ where });
    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getPostById = async (id: number) => {

    return await prisma.$transaction(async (tx: any) => {
        await tx.post.update({
            where: { id },
            data: {
                views: { increment: 1 }
            }
        });

        const postData = await tx.post.findUnique({
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
        return postData;
    });



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

const getBlogStats = async () => {
    return await prisma.$transaction(async (tx: any) => {
        const aggregates = await tx.post.aggregate({
            _count: true,
            _sum: { views: true },
            _avg: { views: true },
            _max: { views: true },
            _min: { views: true },
        });

        const featuredCount = await tx.post.count({
            where: { isFeatured: true }
        });

        const featuredPosts = await tx.post.findFirst(
            {
                where: { isFeatured: true },
                orderBy: { views: 'desc' },
            }
        );

        const lasWeek = new Date();
        lasWeek.setDate(lasWeek.getDate() - 7);

        const lastWeekPostCount = await tx.post.count({
            where: {
                createdAt: { gte: lasWeek }
            }
        });

        return {
            stats: {
                totalPosts: aggregates._count || 0,
                totalViews: aggregates._sum.views || 0,
                averageViews: aggregates._avg.views || 0,
                maxViews: aggregates._max.views || 0,
                minViews: aggregates._min.views || 0,
            },
            featured: {
                count: featuredCount,
                topPost: featuredPosts,
            },
            lastWeekPostCount,
        };
    });
};
export const PostService = {
    CreatePost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getBlogStats

};