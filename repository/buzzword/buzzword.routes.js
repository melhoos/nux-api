const _buzzwordRepository = require('./buzzword.repository');
const dbContext = require('../../database/dbContext');

module.exports = function (router) {
    const buzzwordRepository = _buzzwordRepository(dbContext);
    router.route('/buzzwords')
        .get(buzzwordRepository.getAll);
    router.route('/buzzword')
        .post(buzzwordRepository.post);
    router.route('/buzzword/:id')
        .delete(buzzwordRepository.delete)
        .put(buzzwordRepository.put);
}