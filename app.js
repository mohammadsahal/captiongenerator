var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require("firebase/app");

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var signinRouter = require('./routes/signin');
var logoutRouter = require('./routes/logout');
var imageRouter = require('./routes/image');
var searchHashRouter = require('./routes/searchHash');
var captionRouter = require('./routes/caption');

var firebaseConfig = require('./FirebaseConfig.json');
var app = express();

//firebase config
var firebaseConfig = {
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    databaseURL: firebaseConfig.databaseURL,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId,
    measurementId: firebaseConfig.measurementId
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Adding the Firebase products 
const auth = require("firebase/auth");
const firestore = require("firebase/firestore");
const storage = require("firebase/storage");

// view engine setup
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/signin', signinRouter);
app.use('/logout', logoutRouter);
app.use('/image', imageRouter);
app.use('/caption', captionRouter);
app.use('/searchHash', searchHashRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;