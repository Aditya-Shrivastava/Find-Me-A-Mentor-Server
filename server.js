const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const verifyToken = require('./middleware/verifyToken');

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const testRoute = require('./routes/testRoute');
const testimonialRoute = require('./routes/testimonialRoute');
const categoryRoute = require('./routes/categoryRoute');
const slotRoute = require('./routes/slotRoute');

const search = require('./controllers/searchController');

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
app.use(cors());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// Route Middlewares
app.get('/', (req, res) => {
	res.send('✅ Server Running!');
});

app.use('/api/test', testRoute);

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/testimonials', testimonialRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/search', search);
app.use('/api/v1/slot', slotRoute);

app.use('*', (req, res) => {
	res.status(400).json({ error: 'Invalid URL' });
});

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
