import mongoose from "mongoose";

const PostsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const PostModel = mongoose.model('Posts', PostsSchema);

export default PostModel;