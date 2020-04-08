var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function BuzzwordRepository(dbContext) {

    function getConferences(req, res) {
        var query = "select * from [dbo].[Conferences] order by StartDate asc"
        dbContext.getQuery(query, [], false, function (error, data) {
            return res.json(response(data, error));
        });
    }

    function getAllConferencesFromToday(req, res) {
        query = "select * from [dbo].[Conferences] where StartDate > GETDATE()"
        dbContext.getQuery(query, [], false, function (error, data) {
            return res.json(response(data, error));
        });
    }

    return {
            getAll: getConferences,
            getAllFromToday: getAllConferencesFromToday
        }
    }
    
    module.exports = BuzzwordRepository;