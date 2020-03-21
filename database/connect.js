var Connection = require('tedious').Connection;
var config = {
    server: 'ite-tech-mad-sqlsrv.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: '####',
            password: '####'
        }
    },
    options: {
        database: 'ite-tech-mad-sqldb',
        //instanceName: 'Sqlexpress',
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