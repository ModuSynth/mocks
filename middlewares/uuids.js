const uuid = require('uuid');

module.exports = {
    uuids: (request, _response, next) => {
        if (request.method === 'POST') request.body.id = uuid.v4();
        next();
    }
};