// https://medium.com/@bbkashikar/create-rest-api-with-node-js-and-sql-server-as-database-550be4471fb6
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var port = process.env.port || 60
var allowedOrigins = [
    'http://localhost:3000', //local
    'http://localhost:7070', //nux-admin docker
    'http://localhost:8080', //nux-app docker
    'http://nux.e74c370edf4345d39982.westeurope.aksapp.io', //nux-app 
    'http://nux-admin.e74c370edf4345d39982.westeurope.aksapp.io', // nux-admin
    'https://nux.mad.itera.no/' // mad itera
];

app.use(cors({
    origin: function(origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                        'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Origin, Content-Type'
}));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.listen(port, () => {
    console.log(`Hi, port ${port} is running`);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var router = require('./routes')();
 
app.use('/api', router);