const { name, description } = require('./package.json');

module.exports = {
  title: name,
  nav: {
    Source: 'https://github.com/allegiant-js/httpduplex',
    Docs: './code/index.html'
  },
  body: `
      <div style="width:80%;position: absolute;left: 50%;top: 50%;-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);">
        <h3 class="text-center" style="font-weight: 100"> ${description} </h3>
        <pre style="background-color:rgb(7, 7, 7);color:rgb(228, 228, 228);white-space: pre;text-align:left;width: auto;display:inline-block;">
const fs = require('fs');
const http = require('http');
const httpDuplex = require('@allegiant/httpduplex');

var server = http.createServer(function (req, res) {
        var dup = new httpDuplex(req, res);
        console.log(dup.method + ' ' + dup.url);

        if (dup.url == '/') {
            dup.setHeader('content-type', 'text/plain');
            if (dup.method === 'POST') {
                let size = 0;
                dup.on('data', buf => size += buf.length)
                   .on('end', () => dup.end(size.toString()));
            } else {
                fs.createReadStream('README.md').pipe(dup);
            }
        } else {
            dup.setHeader('content-type', 'text/html');
            dup.statusCode = 404;
            dup.end('Not found');
        }
}).on('listening', function () {
    console.log('Listening http://localhost:' + server.address().port + '/');
}).listen(7000);
        </pre>
      </div>
    `,
  options: {
    width: '80%'
  },
  footer: `
       <div class="text-black">Made with ☕️ by <a href="https://github.com/allegiant-js">✭ Allegiant</a></div>
    `,
  template: 'landing',
  output: './docs'
};
