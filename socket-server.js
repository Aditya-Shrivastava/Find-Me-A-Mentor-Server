const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});
const cors = require('cors');
require('dotenv').config();

app.use(cors());
const SOCKET_PORT = process.env.SOCKET_PORT || 5001;

io.on('connection', (socket) => {
	socket.on('join-room', ({ roomId, userId }) => {
		console.log(`joining room: ${roomId} and sending id: ${userId}`);
		socket.join(roomId);
		socket.broadcast.to(roomId).emit('user-connected', userId);
	});

	socket.on('send-message', (newMessage) => {
		console.log('sending message');
		socket.broadcast
			.to(newMessage.roomId)
			.emit('receive-message', newMessage);
	});

	socket.on('call-user', ({ userToCall, signalData, from, name }) => {
		console.log(`call to ${userToCall} from ${from}`);
		io.to(userToCall).emit('call-user', { signal: signalData, from, name });
	});

	socket.on('answer-call', (data) => {
		console.log('user answered call');
		console.log(data.to);
		io.to(data.to).emit('call-accepted', data.signal);
	});

	socket.on('disconnect', (roomId) => {
		console.log('leaving room');
		socket.leave(roomId);
		socket.broadcast.to(roomId).emit('call-ended');
	});
});

server.listen(SOCKET_PORT, () => {
	console.log('✅ Socket Server Running');
});
