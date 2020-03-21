var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function BuzzwordRepository(dbContext) {

    function getBuzzwords(req, res) {
        //var query = "GetBuzzwords"
        var query = "select * from [dbo].Buzzwords"
        dbContext.getQuery(query, [], false, function (error, data) {
            return res.json(response(data, error));
        });
    }

    // function getBuzzword(req, res) {
    //     if (req.params.employeeId) {
    //         var parameters = [];
    //         parameters.push({ name: 'Id', type: TYPES.Int, val: req.params.employeeId });
    //         var query = "select * from buzzwords where Id = @Id"
    //         dbContext.getQuery(query, parameters, false, function (error, data) {
    //             if (data) {
    //                 req.data = data[0];
    //                 return next();
    //             }
    //             return res.sendStatus(404);
    //         });
    //     }
    // }

    // function postBuzzwords(req, res) {
    //     var parameters = [];
    //     parameters.push({ name: 'FirstName', type: TYPES.VarChar, val: req.body.FirstName });
    //     parameters.push({ name: 'LastName', type: TYPES.VarChar, val: req.body.LastName });
    //     parameters.push({ name: 'MiddleName', type: TYPES.VarChar, val: req.body.MiddleName });
    //     parameters.push({ name: 'DOB', type: TYPES.DateTime, val: new Date(req.body.DOB) });
    //     parameters.push({ name: 'Designation', type: TYPES.VarChar, val: req.body.Designation });
    //     parameters.push({ name: 'ReportingTo', type: TYPES.VarChar, val: req.body.ReportingTo });
    //     parameters.push({ name: 'Salary', type: TYPES.Int, val: req.body.Salary });
    //     dbContext.post("InsertOrUpdateEmployee", parameters, function (error, data) {
    //         return res.json(response(data, error));
    //     });
    // }

    return {
            getAll: getBuzzwords
            // get: getEmployee,
            // post: postEmployees 
        }
    }
    
    module.exports = BuzzwordRepository;