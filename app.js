if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();
const path = require('path');


var indexRouter = require('./routes/index.js');

// set view folder to ./views
app.set('views', path.join(__dirname, 'views'));
// set view engine to ejs
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// run server
app.listen(process.env.PORT, () =>
	console.log("Server running and listening on port " + process.env.PORT + "!")
);
