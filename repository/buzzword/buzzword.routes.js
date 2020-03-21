const _buzzwordRepository = require('./buzzword.repository');
const dbContext = require('../../database/dbContext');

module.exports = function (router) {
    const buzzwordRepository = _buzzwordRepository(dbContext);
    router.route('/buzzwords')
        .get(buzzwordRepository.getAll)
        //.post(employeeRepository.post);
        
    // router.route('/employees/department')
    // .get(employeeRepository.getMulti);

    // router.use('/employees/:employeeId', employeeRepository.intercept);

    // router.route('/employees/:employeeId')
    //         .get(employeeRepository.get)
    //         .put(employeeRepository.put)
    //         .delete(employeeRepository.delete);
}