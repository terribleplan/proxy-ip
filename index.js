var _ = require('lodash');
var createMatcher = require('./lib/cidr-match');

module.exports = function createParser(trustChain) {
    if (trustChain === true) {
        return function(req, res, next) {
            var ip = null;
            ip = ip || req.socket.remoteAddress;
            req.ip = ip;
            next();
        }
    }

    var matcher;
    if (trustChain === true) {
        matcher = takeLast;
    } else if (trustChain instanceof Array) {
        matcher = findFirstUntrusted(_.map(trustChain, determineRange))
    } else {
        throw new Error("Unknown trustChain input " + trustChain);
    }

    return function(req, res, next) {
        var fwdChain = [req.socket.remoteAddress];
        if (req.headers.hasOwnProperty("x-forwarded-for")) {
            fwdChain = fwdChain.concat(req.headers["x-forwarded-for"].split(", "));
        }
        req.ip = nullOnErr(matcher, fwdChain);
        next();
    }
};

function determineRange(range) {
    if (range instanceof Array) {
        return createMatcher(range);
    }
    if (typeof range === "string") {
        switch (range) {
            case "cloudflare":
                return createMatcher(require('./ranges/' + range));
            default:
                return createMatcher([range]);
        }
    }
    throw new Error("Bad range value");
}

function takeLast(input) {
    return input[input.length - 1];
}

function findFirstUntrusted(trusted) {
    return function find(input) {
        //Worst case we should return the ip at trusted.length, since it is one after the ones we trust
        input = input.slice(0, trusted.length + 1);
        for (var i = 0; i < trusted.length; i++) {
            if (trusted[i](input[i])) {
                continue;
            }
            return input[i];
        }
        return input[trusted.length];
    }
}

function nullOnErr(func, arg) {
    try {
        return func(arg);
    } catch(e) {
        return null;
    }
}