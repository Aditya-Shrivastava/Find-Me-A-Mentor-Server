const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let userCount = 0;

app.get('/', (req, res) => {
	res.send(`No of users connected: ${userCount}`);
});

io.on('connection', (socket) => {
	console.log('user connected');
	userCount++;
	socket.on('disconnect', () => {
		userCount--;
	});
});

server.listen(5001, () => {
	console.log('✅ Socket Server Running');
});
