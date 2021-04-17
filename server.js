const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const testRoute = require('./routes/testRoute');
const verifyToken = require('./routes/verifyToken');

// Initialize App
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
mongoose.connect(
	process.env.MONGO_URI,
	{
		useFindAndModify: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log('Database Connected!');
	}
);

// App Middleware
app.use(express.json());

// Route Middlewares
app.get('/', (req, res) => {
	res.send('Server Running!');
});

app.use('/api/auth', authRoute);
app.use('/api/test', testRoute);
app.use('/api/user', verifyToken, userRoute);

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
