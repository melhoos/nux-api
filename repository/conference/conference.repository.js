var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function fullSqlQueryBuilder (l, m, y, ofm) {
    let query = "SET LANGUAGE Norwegian; SELECT * FROM [dbo].[Conferences]"
    query += (l.length > 0 ? " WHERE" + sqlContainsQueryBuilder(l) : "");
    query += (l.length === 0 && ((m !== undefined || y !== undefined || ofm)) ? " WHERE" : ((m !== undefined || y !== undefined || ofm) ? " AND" : "") );
    query += (m !== undefined) ? " ((DATENAME(month,[StartDate])) LIKE @Month OR (DATENAME(month,[EndDate])) LIKE @Month)" : ""
    query += (m !== undefined && y !== undefined) ? " AND" : "";
    query += (y !== undefined) ? " YEAR([StartDate]) = @Year" : "";
    query += ((y !== undefined || m !== undefined) && ofm) ? " AND" : "";
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

    function postConference(req, res) {
        var parameters = [];
        parameters.push({ name: 'Name', type: TYPES.VarChar, val: req.body.Name });
        parameters.push({ name: 'Description', type: TYPES.VarChar, val: req.body.Description });
        parameters.push({ name: 'City', type: TYPES.VarChar, val: req.body.City });
        parameters.push({ name: 'Country', type: TYPES.VarChar, val: req.body.Country });
        parameters.push({ name: 'URL', type: TYPES.VarChar, val: req.body.URL });
        parameters.push({ name: 'StartDate', type: TYPES.VarChar, val: req.body.StartDate });
        parameters.push({ name: 'EndDate', type: TYPES.VarChar, val: req.body.EndDate });
        var query = "insert into [dbo].[Conferences] (Name, Description, City, Country, StartDate, EndDate, URL) values (@Name, @Description, @City, @Country, @StartDate, @EndDate, @URL)"
        dbContext.post(query, parameters, function (error, data) {
            return res.json(response(data, error));
        })
    }

    function putConference(req, res) {
        var parameters = [];
        parameters.push({ name: 'Id', type: TYPES.VarChar, val: req.params.id });
        parameters.push({ name: 'Name', type: TYPES.VarChar, val: req.body.Name });
        parameters.push({ name: 'Description', type: TYPES.VarChar, val: req.body.Description });
        parameters.push({ name: 'City', type: TYPES.VarChar, val: req.body.City });
        parameters.push({ name: 'Country', type: TYPES.VarChar, val: req.body.Country });
        parameters.push({ name: 'URL', type: TYPES.VarChar, val: req.body.URL });
        parameters.push({ name: 'StartDate', type: TYPES.VarChar, val: req.body.StartDate });
        parameters.push({ name: 'EndDate', type: TYPES.VarChar, val: req.body.EndDate });
        var query = "update [dbo].[Conferences] set Name = @Name, Description = @Description, City = @City, Country = @Country, URL = @URL, StartDate = @StartDate, EndDate = @EndDate where Id = @Id"
        dbContext.getQuery(query, parameters, false, function(error, data, rowCount) {
            if (rowCount > 0) {
                return res.json({
                    status: 200,
                    message: 'Record updated'
                })
            }
            return res.json({
                status: 404,
                message: 'Record not updated'
            })
        })
    }

    function deleteConference(req, res) {
        if (req.params.id) {
            var parameters = [];
            parameters.push({ name: 'Id', type: TYPES.VarChar, val: req.params.id });
            var query = "delete from [dbo].[Conferences] where Id = @Id"
            dbContext.getQuery(query, parameters, false, function(error, data, rowCount) {
                if (rowCount > 0) {
                    return res.json({
                        status: 200,
                        message: 'Record is deleted'
                    })
                }
                return res.json({
                    status: 404,
                    message: 'Record not deleted'
                })
            })
        }
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
            post: postConference,
            put: putConference,
            delete: deleteConference,
            getAllFromToday: getAllConferencesFromToday,
            getBySearch: getAllConferencesBySearch
        }
    }
    
    module.exports = BuzzwordRepository;