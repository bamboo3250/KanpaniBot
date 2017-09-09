'use strict';

var request = require('request'); 
var rootCas = require('ssl-root-cas/latest').create();
 
rootCas.addFile('/etc/ssl/certs/ssl-cert-snakeoil.pem');

// will work with all https requests will all libraries (i.e. request.js) 
require('https').globalAgent.options.ca = rootCas;

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