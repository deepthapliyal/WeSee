const express = require('express');
const app = express();
const PORT = 4000;

// New imports
const cors = require('cors');
app.use(cors());
const http = require('http').Server(app);

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

// Mock database storage (replace with your actual database logic)
const rooms = {};
const messages = [];

// Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');

    socket.on('Sendmessage', (message)=>{
        console.log(message, "is here")
        socket.emit('message', message)
    })
});
})
app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// Helper function to generate unique IDs (replace with a better method)
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

// Helper function to get the room ID by user's socket ID
function getRoomIdBySocketId(socketId) {
    for (const roomId in rooms) {
        if (rooms[roomId].participants.includes(socketId)) {
            return roomId;
        }
    }
    return null;
}
