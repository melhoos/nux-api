const _conferenceRepository = require('./conference.repository');
const dbContext = require('../../database/dbContext');

module.exports = function (router) {
    const conferenceRepository = _conferenceRepository(dbContext);
    router.route('/conferences')
        .get(conferenceRepository.getAll);
    router.route('/conferencesFromToday')
        .get(conferenceRepository.getAllFromToday);
}