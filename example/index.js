const fs = require('fs');
const http = require('http');
const httpDuplex = require('../index');

var server = http.createServer(function (req, res) {
    var dup = new httpDuplex(req, res);
    console.log(dup.method + ' ' + dup.url); // eslint-disable-line

    if (dup.url == '/') {
        dup.setHeader('content-type', 'text/plain');
        if (dup.method === 'POST') {
            let size = 0;
            dup.on('data', buf => size += buf.length)
               .on('end', () => dup.end(size + '\n'));
        } else {
            fs.createReadStream('README.md').pipe(dup);
        }
    } else {
        dup.setHeader('content-type', 'text/html');
        dup.statusCode = 404;
        dup.end('<h1>Not found</h1>');
    }
})
.on('listening', function () {
    console.log('Listening http://localhost:' + server.address().port + '/'); // eslint-disable-line
})
.listen(7000);
