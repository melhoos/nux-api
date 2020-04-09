var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function fullSqlQueryBuilder (l, m, y, ofm) {
    let query = "SET LANGUAGE Norwegian; SELECT * FROM [dbo].[Conferences]"
    query += (l.length > 0 ? " WHERE" + sqlContainsQueryBuilder(l) : "");
    query += (l.length === 0 && ((m !== undefined || y !== undefined || ofm)) ? " WHERE" : ((m !== undefined || y !== undefined || ofm) ? " AND" : "") );
    query += (m !== undefined) ? " ((DATENAME(month,[StartDate])) LIKE @Month OR (DATENAME(month,[EndDate])) LIKE @Month)" : ""
    query += (m !== undefined && y !== undefined) ? " AND" : "";
    query += (y !== undefined) ? " YEAR([StartDate]) = @Year" : "";
    query += (y !== undefined && ofm) ? " AND" : "";
    query += (ofm) ? " StartDate > GETDATE()" : "";
    return query;
}

function sqlContainsQueryBuilder(list) {
    let query = ""
    list.forEach((elem, i) =>
    {
        query += ` CONTAINS((Name, City, Country), '${elem}')`
        if (i < (list.length - 1) ) query += ` AND `;
        else query += ""
    })
    return query;
}

function fullParamterBuilder(l, m, y) {
    var parameters = []; // [...paramenterListBuilder(l)]
    if (m !== undefined) parameters.push({ name: 'Month', type: TYPES.VarChar, val: m });
    if (y !== undefined) parameters.push({ name: 'Year', type: TYPES.VarChar, val: y });
    return parameters;
}

// function paramenterListBuilder(list) { // todo make this work later
//     var parameters = [];
//     list.forEach((elem, i) => { parameters.push({name: `Elem`, type: TYPES.VarChar, value: elem}) })
//     return parameters;
// }

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

    function getAllConferencesBySearch(req, res) {
        var parameters = fullParamterBuilder(req.body.SearchWords, req.body.Month, req.body.Year)
        let query = fullSqlQueryBuilder(req.body.SearchWords, req.body.Month, req.body.Year, req.body.OnlyFromTomorrow)
        console.log("query: ", query);
        dbContext.getQuery(query, parameters, false, function (error, data) {
            return res.json(response(data, error));
        });
    }

    return {
            getAll: getConferences,
            getAllFromToday: getAllConferencesFromToday,
            getBySearch: getAllConferencesBySearch
        }
    }
    
    module.exports = BuzzwordRepository;