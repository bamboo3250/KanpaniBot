var http = require('http');
var fs = require('fs');

function ImageDownloader() {
}

ImageDownloader.prototype.download = function(urlToDownload, fileName, callback) {
    fs.access(fileName, fs.F_OK, function(err) {
        if (err) {
            var file = fs.createWriteStream(fileName);
            console.log("Downloading File.");
            var request = http.get(urlToDownload, function(response) {
                  response.pipe(file);
                  callback();
            });
        } else {
            console.log("File existed.");
            callback();
        }
    });
}

module.exports = new ImageDownloader();