const _conferenceRepository = require('./conference.repository');
const dbContext = require('../../database/dbContext');

module.exports = function (router) {
    const conferenceRepository = _conferenceRepository(dbContext);
    router.route('/conferences')
        .get(conferenceRepository.getAll);
    router.route('/conference')
        .post(conferenceRepository.post);
    router.route('/conference/:id')
        .put(conferenceRepository.put)
        .delete(conferenceRepository.delete);
    router.route('/conferencesFromToday')
        .get(conferenceRepository.getAllFromToday);
    router.route('/conferencesBySearch')
        .post(conferenceRepository.getBySearch);
}