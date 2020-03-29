var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function BuzzwordRepository(dbContext) {

    function getBuzzwords(req, res) {
        var query = "select * from [dbo].Buzzwords order by Title asc"
        dbContext.getQuery(query, [], false, function (error, data) {
            return res.json(response(data, error));
        });
    }

    function postBuzzword(req, res) {
        var parameters = [];
        parameters.push({ name: 'Title', type: TYPES.VarChar, val: req.body.Title });
        parameters.push({ name: 'Description', type: TYPES.VarChar, val: req.body.Description });
        var query = "insert into [dbo].Buzzwords (Title, Description) values (@Title, @Description)"
        dbContext.post(query, parameters, function (error, data) {
            return res.json(response(data, error));
        })
    }

    function putBuzzword(req, res) {
        var parameters = [];
        parameters.push({ name: 'Id', type: TYPES.VarChar, val: req.params.id });
        parameters.push({ name: 'Title', type: TYPES.VarChar, val: req.body.Title });
        parameters.push({ name: 'Description', type: TYPES.VarChar, val: req.body.Description });
        var query = "update [dbo].Buzzwords set Title = @Title, Description = @Description where Id = @Id"
        dbContext.getQuery(query, parameters, false, function(error, data, rowCount) {
            if (rowCount > 0) {
                return res.json('Record is updated');
            }
            return res.sendStatus(404);
        })
    }

    function deleteBuzzwrod(req, res) {
        if (req.params.id) {
            var parameters = [];
            parameters.push({ name: 'Id', type: TYPES.VarChar, val: req.params.id });
            var query = "delete from [dbo].Buzzwords where Id = @Id"
            dbContext.getQuery(query, parameters, false, function(error, data, rowCount) {
                if (rowCount > 0) {
                    return res.json('Record is deleted');
                }
                return res.sendStatus(404);
            })

        }
    } 


    return {
            getAll: getBuzzwords,
            post: postBuzzword,
            put: putBuzzword,
            delete: deleteBuzzwrod
        }
    }
    
    module.exports = BuzzwordRepository;