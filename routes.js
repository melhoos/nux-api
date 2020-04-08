const express = require('express');
function eRoutes() {
    const router = express.Router();
    var buzzword = require('./repository/buzzword/buzzword.routes')(router);
    var conference = require('./repository/conference/conference.routes')(router);

    return router;
}
module.exports = eRoutes;