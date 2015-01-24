proxy-ip
========
Express is pretty awesome, but a binary choice between trusting all proxies or trusting none doesn't cut it with the
prevalence of things like cloudflare and heroku, both of which are trusted proxies.

This piece of middleware allows you to define which proxies you trust, and will return the first IP after that.
```js
var app = require('express')();

app.use(require('proxy-ip')(['any', 'cloudflare', '192.168.0.0/16']));
```

Special Values
==============
Due to the prevalence of some services we will allow you to define some trusted services by name

- 'cloudflare' - [https://www.cloudflare.com/ips-v4]
- 'any' - 0.0.0.0/0, which is perfect if you have a forced trusted routing layer such as heroku.

IPv6?
=====
Not yet ;)
