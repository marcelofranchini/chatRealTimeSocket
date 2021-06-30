import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import path from 'path';


const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer);

app.use(express.static(path.resolve(__dirname, '..', 'public')))


let messages: any = [];
io.on('connection', (socket) => {
    console.log(`Nova conexão socket - ${socket.id}`);

    socket.emit('previusMessages', messages);

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('recivedMessage', data)
        })
})
httpServer.listen(3333);