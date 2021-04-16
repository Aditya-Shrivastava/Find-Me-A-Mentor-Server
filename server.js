const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoute = require('./routes/authRoute');
const testRoute = require('./routes/testRoute');

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

app.use('/api/user', authRoute);
app.use('/api/test', testRoute);

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
