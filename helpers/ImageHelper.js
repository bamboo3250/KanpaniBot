var http = require('http');
var fs = require('fs');
var Jimp = require("jimp");

function ImageHelper() {
}

ImageHelper.prototype.download = function(queue, callback) {
    if (queue.length <= 0) {
        callback(null);
        return;
    }
    var that = this;
    var filePathToDownload = queue[0].fileToDownload;
    var filePathToSave = queue[0].fileToSave;
    var thisQueue = queue;
    fs.access(filePathToSave, fs.F_OK, function(err) {
        if (err) {
            var file = fs.createWriteStream(filePathToSave);
            // console.log("Downloading File: " + filePathToDownload);
            var request = http.get(filePathToDownload, function(response) {
                // console.log("statusCode: " + response.statusCode);
                // console.log("content-type: " + response.headers['content-type']);
                if (response.statusCode != 200) return;

                response.pipe(file);
                response.on('end', () => {
                    thisQueue.shift();
                    that.download(thisQueue, callback);
                });
            }).on('error', (err) => {
                callback(err);
            });;
        } else {
            // console.log("File existed.");
            thisQueue.shift();
            that.download(thisQueue, callback);
        }
    });
}

ImageHelper.prototype.read = function(queue, callback, curResult = []) {
    if (queue.length <= 0) {
        callback(null, curResult);
        return;
    }
    var that = this;
    Jimp.read(queue[0], function (err, image) {
        if (err) { 
            console.log(err); 
            var falseImage = queue[0];
            fs.unlink(falseImage, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('successfully deleted ' + falseImage);
            });
            image = new Jimp(1024, 1024, 0xFFFFFF00, function (err, image) {
                queue.shift();
                curResult.push(image);
                that.read(queue, callback, curResult);
            });
            return;
        }
        queue.shift();
        curResult.push(image);
        that.read(queue, callback, curResult);
    });
}

module.exports = new ImageHelper();