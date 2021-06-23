const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST']
	}
});

io.on('connection', (socket) => {
	socket.on('join-room', ({ roomId, username }) => {
		socket.join(roomId);
		socket.broadcast.to(roomId).emit('user-connected', username);

		socket.on('send-message', newMessage => {
			socket.broadcast.to(roomId).emit('receive-message', newMessage);
		});
	})

	socket.on("disconnect", () => {
		console.log('User Left :(');
		// socket.broadcast.emit("callEnded");
	});

	// socket.on("callUser", (data) => )
});

server.listen(5001, () => {
	console.log('✅ Socket Server Running');
});
