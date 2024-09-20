const path = require('path'); // Built into Node
const express = require('express');
const logger = require('morgan');
const app = express();

// Process the secrets/config vars in .env
require('dotenv').config();

// Connect to Database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.info(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(logger('dev'));
// Serve static assets from the frontend's built code folder 
app.use(express.static(path.join(__dirname, '../frontend/dist')));
// Note that express.urlencoded middleware is not needed
// because forms are not submitted!
app.use(express.json());

// Middleware to check the request's headers for a JWT and
// verify that it's valid. If so, it will assign the
// user object in the JWT's payload to req.user
app.use(require('./middleware/checkToken'));

// API Routes
app.use('/api/auth', require('./routes/auth'));
const ensureLoggedIn = require('./middleware/ensureLoggedIn');

// Club routes for managing API calls
app.use('/api/clubs', require('./routes/clubs')); 

// Use a "catch-all" route to deliver the frontend's production index.html
app.get('*', function (req, res) {
  console.info('Serving the frontend from:', __dirname);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info(`Express app is listening on port ${port}`);
});
