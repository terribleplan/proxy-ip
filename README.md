proxy-ip
========
[![License][license-image]][license-url]
[![NPM Version][npm-version-image]][npm-url]
[![Tag Version][tag-version-image]][github-url]
[![Build Status][build-image]][build-url]

Express is pretty awesome, but a binary choice between trusting all proxies or trusting none doesn't cut it with the
prevalence of things like cloudflare and heroku, both of which are trusted proxies.

This piece of middleware allows you to define which proxies you trust, and will return the first IP after that.
```js
var app = require('express')();

app.use(require('proxy-ip')(['any', 'cloudflare', '192.168.0.0/16']));
```

Special Values
==============
Due to the prevalence of some services you can define some trusted services by name

- 'cloudflare' - https://www.cloudflare.com/ips-v4
- 'any' - 0.0.0.0/0, which is perfect if you have a forced trusted routing layer such as heroku.

IPv6?
=====
Not yet ;)

[license-url]: https://github.com/terribleplan/proxy-ip/blob/master/LICENSE
[npm-url]: https://npmjs.org/package/proxy-ip
[build-url]: https://travis-ci.org/terribleplan/proxy-ip
[github-url]: https://github.com/terribleplan/proxy-ip
[license-image]: http://img.shields.io/npm/l/proxy-ip.svg
[build-image]: http://img.shields.io/travis/terribleplan/proxy-ip.svg
[npm-version-image]: http://img.shields.io/npm/v/proxy-ip.svg
[tag-version-image]: http://img.shields.io/github/tag/terribleplan/proxy-ip.svg
