const express = require('express');
const cors = require('cors');
const PORT = 4000;
const app = express();

// New imports
const http = require('http').Server(app);

app.use(cors());
const SocketIo = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});
SocketIo.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('offer', signal => {
        // Broadcast the offer signal to all other connected clients
        socket.broadcast.emit('offer', signal);
    });


})

http.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})