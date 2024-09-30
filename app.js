'use strict';
import debug from 'debug';
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import routes from './routes/api.js';
import users from './routes/users.js';


var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

// API Routes
app.use('/api', routes);
app.use('/users', users);

// Handling all GET routes
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'client/build', 'index.html')); });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 404 Error handler - Catch unmatched routes and serve the 404.html from views
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Development error handler
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.sendFile(path.join(__dirname, 'views', '500.html'));
    });
}

// Production error handler (no stacktrace)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname, 'views', '500.html'));
});

app.set('port', process.env.PORT || 3000);

mongoose.connect('mongodb+srv://YMat:MxFJvAWxuac88*7@backenddbfree.5kwl5.mongodb.net/JobScrapper?retryWrites=true&w=majority&appName=BackendDBFree')
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.log('Could not connect to Database:', err));


const port = 3000;
var server = app.listen(port, function () {
    debug('Express server listening on port ' + server.address().port);
    console.log('Listening on port ' + port);
});
