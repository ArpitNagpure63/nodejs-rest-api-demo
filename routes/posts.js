import express from "express";
import PostModel from "../models/Posts.js";

const PostsRouter = express.Router();

// GET: fetch all posts
PostsRouter.get('/', async (req, res) => {
    try {
        const allPosts = await PostModel.find();
        res.json(allPosts);     //  res.status(200).json(allPosts); 
    } catch (err) {
        res.json(err);         // res.status(404).json(err); 
    }
});

// GET: specific post
PostsRouter.get('/:postId', async (req, res) => {
    try {
        const specificPost = await PostModel.findById(req.params.postId);
        res.json(specificPost);
    } catch (err) {
        res.json(err);
    }
});

// POST: add new post
PostsRouter.post('/', (req, res) => {
    const post = new PostModel({
        title: req.body.title,
        description: req.body.description
    });

    post.save().then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json({ message: error });
    });
});

// DELETE: specific post
PostsRouter.delete('/:postId', async (req, res) => {
    try {
        const deletedPost = await PostModel.remove({ _id: req.params.postId });
        res.json(deletedPost);
    } catch (err) {
        res.json(err);
    }
});

// PATCH: Update sepcific post
PostsRouter.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await PostModel.updateOne({ _id: req.params.postId }, {
            $set: { title: req.body.title }
        });
        res.json(updatedPost);
    } catch (err) {
        res.json(err);
    }
});


export default PostsRouter;