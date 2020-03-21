const express = require('express');
function eRoutes() {
    const router = express.Router();
    var buzzword = require('./repository/buzzword/buzzword.routes')(router);
    //var department = require('./repository/department/department.routes')(router);
    return router;
}
module.exports = eRoutes;