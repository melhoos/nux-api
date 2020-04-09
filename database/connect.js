var Connection = require('tedious').Connection;
var conf = require('./utility/dbConfig');

var config = {
    server: conf.dbServer,
    authentication: {
        type: 'default',
        options: {
            userName: conf.dbUser,
            password: conf.dbPassword,
            language: conf.dbLang
        }
    },
    options: {
        database: conf.dbName,
        rowCollectionOnDone: true,
        useColumnNames: false
    }
}
var connection = new Connection(config);

connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected');
    }
});
module.exports = connection;

// check connection: $node database/connect.js