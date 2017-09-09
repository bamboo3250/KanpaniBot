var https = require('https');

function RequestHelper() {}

RequestHelper.prototype.getHttps = function(url, callback) {

    https.get(url, (res) => {
        var body = "";
        res.on('data', function(data) {
            body += data;
        });

        res.on('end', function() {
            //here we have the full response, html or json object
            callback(body, null);
        })

    }).on('error', (error) => {
        callback(null, error);
    });
};

module.exports = new RequestHelper();