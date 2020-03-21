// https://medium.com/@bbkashikar/create-rest-api-with-node-js-and-sql-server-as-database-550be4471fb6
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.port || 60

app.listen(port, () => {
    console.log(`Hi, port ${port} is running`);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var router = require('./routes')();
 
app.use('/api', router);


// https://medium.com/@jocapc/creating-rest-api-with-nodejs-and-sql-server-azure-sql-4933fd3fb2be
// var express = require('express');
// var config = require('config');
// var bodyParser = require('body-parser');
// var tediousExpress = require('express4-tedious');

// var app = express();
// app.use(function (req, res, next) {
//     req.sql = tediousExpress(config.get('connection'));
//     next();
// });

// app.use(bodyParser.text()); 
// app.use('/todo', require('./routes/buzzwords'));

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found: '+ req.method + ":" + req.originalUrl);
//     err.status = 404;
//     next(err);
// });
// app.set('port', process.env.PORT || 3000);

// var server = app.listen(app.get('port'), function() {
//     console.log('Express server listening on port ' + server.address().port);
// });

// module.exports = app;