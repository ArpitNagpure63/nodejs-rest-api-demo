import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

dotenv.config();

import PostsRouter from './routes/posts.js'; // always need to use extension .js / .ts


const app = express();

// Middleware: execute function when routes are called, syntax is app.use() 
// Use case: Check for authentication on routes
// app.use('/post', () => {
//     console.log('We are on middleware funcation for path /posts');
// });

app.use(bodyParser.json());  // Or use express.json() instead of bodyParser.json() to accept JSON data in request body
app.use('/posts', PostsRouter);

// Routes
app.get('/', (req, res) => {
    res.send('we are on / path');
});

// app.get('/posts', (req, res) => {
//     res.send('we are on /posts path');
// })

// Connect to MongoDB
mongoose.set('strictQuery', true); // TO avoid warning 
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => {
        console.log('Connected to DB');
    }
);

// Connect to Localhost Server
app.listen(process.env.NODE_SERVER, () => {
    console.log('Connected to LocalHost Server');
});


// Alternate Approach to connect to server
// HTTP SERVER
// const http = require('http');

// const requestListener = function (req, res) {
//   res.writeHead(200);
//   res.end('Hello, World!');
// }

// const server = http.createServer(requestListener);
// server.listen(8080);