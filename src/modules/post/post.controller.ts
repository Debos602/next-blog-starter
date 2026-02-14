import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.CreatePost(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'An error occurred while creating the post.' });
    }
};

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = typeof req.query.search === 'string' ? req.query.search : undefined;
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === 'true' : undefined;
        const tags = req.query.tags ? (req.query.tags as string).split(',') : [];
        const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : 'title';
        const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';
        const result = await PostService.getAllPosts({ page, limit, search, isFeatured, tags, sortBy, sortOrder });

        res.status(200).json(result);
    }
    catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).json({ message: 'An error occurred while getting the posts.' });
    }
};
const getPostById = async (req: Request, res: Response) => {
    try {

        const result = await PostService.getPostById(Number(req.params.id));
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Error getting post by ID:', error);
        res.status(500).json({ message: 'An error occurred while getting the post by ID.' });
    }
};

const updatePost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.updatePost(Number(req.params.id), req.body);
        res.status(200).json(result);
    }
    catch (error: any) {
        console.error('Error updating post:', error);
        if (error?.status && error?.message) {
            return res.status(error.status).json({ message: error.message });
        }
        res.status(500).json({ message: 'An error occurred while updating the post.' });
    }
};

const deletePost = async (req: Request, res: Response) => {
    // Implementation for deleting a post
    try {
        const result = await PostService.deletePost(Number(req.params.id));
        res.status(200).json({
            success: true,
            message: 'Post deleted successfully.',
            data: null
        });
    }
    catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'An error occurred while deleting the post.' });
    }
};


const getBlogStats = async (req: Request, res: Response) => {
    try {
        const stats = await PostService.getBlogStats();
        res.status(200).json(stats);
    }
    catch (error) {
        console.error('Error getting blog stats:', error);
        res.status(500).json({ message: 'An error occurred while getting the blog stats.' });
    }
};

export const PostController = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getBlogStats
};