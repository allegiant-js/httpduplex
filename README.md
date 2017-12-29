# HttpDuplex

> Unifies http request and response streams.
>> There be 🐲 here! The API and functionality are being cemented, anything before a 1.0.0 release is subject to change.

[![Npm Version](https://img.shields.io/npm/v/@allegiant/httpduplex.svg)](https://www.npmjs.com/package/@allegiant/httpduplex)
[![Build Status](https://travis-ci.org/allegiant-js/httpduplex.svg?branch=master)](https://travis-ci.org/allegiant-js/httpduplex.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/allegiant-js/httpduplex/badge.svg?branch=master)](https://coveralls.io/github/allegiant-js/httpduplex?branch=master)

## Install

```
npm install @allegiant/httpduplex
```

## Usage

The following example can be found at example/index.js

```js
const fs = require('fs');
const http = require('http');
const httpDuplex = require('@allegiant/httpduplex');

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
        dup.end('Not found');
    }
})
.on('listening', function () {
    console.log('Listening http://localhost:' + server.address().port + '/'); // eslint-disable-line
})
.listen(7000);
```


## Example

Running the following command will start up a simple http server:

```
node example/index.js
```

## Thanks

This began as a compatiblity rewrite of [http-duplex](https://github.com/substack/http-duplex).

## Copyright & License

Copyright &copy; 2017 Allegiant. Distributed under the terms of the MIT License, see [LICENSE](https://github.com/allegiant-js/httpduplex/blob/master/LICENSE)

Availble via [npm](https://www.npmjs.com/package/@allegiant/httpduplex) or [github](https://github.com/allegiant-js/httpduplex).
