var http = require('http');
var fs = require('fs');

function ImageDownloader() {
}

ImageDownloader.prototype.download = function(urlToDownload, fileName, callback) {
    fs.access(fileName, fs.F_OK, function(err) {
        if (err) {
            var file = fs.createWriteStream(fileName);
            console.log("Downloading File: " + urlToDownload);
            var request = http.get(urlToDownload, function(response) {
                console.log("statusCode: " + response.statusCode);
                console.log("content-type: " + response.headers['content-type']);
                if (response.statusCode != 200) return;

                response.pipe(file);
                response.on('end', () => {
                    callback();
                });
            });
        } else {
            console.log("File existed.");
            callback();
        }
    });
}

module.exports = new ImageDownloader();