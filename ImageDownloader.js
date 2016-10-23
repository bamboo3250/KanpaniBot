var http = require('http');
var fs = require('fs');

function FileDownloader() {
    this.download()
}



var file = fs.createWriteStream("file.jpg");
var request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
  response.pipe(file);
});

module.exports = new Employee();