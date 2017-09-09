var request = require('request');

function RequestHelper() {}

RequestHelper.prototype.get = function(url, callback) {
    request(url, function (error, response, body) {
        if (!error && response && response.statusCode == 200) {
            callback(body, null);
        } else {
            callback(null, error);
        }
    });
};

module.exports = new RequestHelper();