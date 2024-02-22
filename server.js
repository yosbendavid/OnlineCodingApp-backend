const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const CodeBlock = require('./models/codeBlock');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());

app.use(express.json());

mongoose.connect('mongodb+srv://yosbendavid:QQ5waku2JrjaXfEA@cluster0.r4ehk1d.mongodb.net/OnlineCodingApp')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if MongoDB connection fails
    });

const server = http.createServer(app);

const io = new Server(server, {
cors: {
    origin: function (origin, callback) {
            callback(null, true);
    },
    methods: ["GET", "POST"],
}
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/getAllCodeBlocks', async (req, res) => {
    try {
        const codeBlocks = await CodeBlock.find();
        res.json(codeBlocks);
    } catch (error) {
        console.error('Error fetching code blocks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getCodeBlock/:id', async (req, res) => {
    try {
        const codeBlock = await CodeBlock.findById(req.params.id);
        if (!codeBlock) {
            return res.status(404).json({ error: 'Code block not found' });
        }
        res.json(codeBlock);
    } catch (error) {
        console.error('Error fetching code block by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Use a Map instead of an object for numOfPeopleInCodeBlock for better performance and readability
const numOfPeopleInCodeBlock = new Map();

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('accessCodeBlockPage', ({ codeBlockId }) => {
        const count = numOfPeopleInCodeBlock.get(codeBlockId) || 0;
        numOfPeopleInCodeBlock.set(codeBlockId, count + 1);
        console.log(`Number of people in code block ${codeBlockId}: ${numOfPeopleInCodeBlock.get(codeBlockId)}`);
    });

    socket.on('leaveCodeBlockPage', ({ codeBlockId }) => {
        const count = Math.max((numOfPeopleInCodeBlock.get(codeBlockId) || 0) - 1, 0);
        numOfPeopleInCodeBlock.set(codeBlockId, count);
        console.log(`Person left. Number of people in code block ${codeBlockId}: ${numOfPeopleInCodeBlock.get(codeBlockId)}`);
    });

    socket.on('requestIsFirstUser', ({ codeBlockId }) => {
        const isFirstUser = numOfPeopleInCodeBlock.get(codeBlockId) === 1;
        socket.emit("recievedIsFirstUser", isFirstUser);
    });

    socket.on('updateText', (text) => {
        io.emit('textUpdated', text);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);

        numOfPeopleInCodeBlock.forEach((value, key) => {
            if (value > 0) {
                numOfPeopleInCodeBlock.set(key, value - 1);
                console.log(`Person left. Number of people in code block ${key}: ${numOfPeopleInCodeBlock.get(key)}`);
            }
        });
    });
});
