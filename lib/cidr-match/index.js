var _ = require('lodash');
var parse = require('../cidr-parse');

var IP_LENGTH = 32;

function buildMatcher(ranges) {
    ranges = _.map(ranges, function(range) {
        return parse(range);
    });

    var rangeSizes = _.sortBy(_.uniq(_.map(ranges, "bitmask")));

    var indexedRanges = _.zipObject(rangeSizes, _.map(rangeSizes, function(size) {
        return new RegExp("(" + _.map(_.filter(ranges, function(range) {
            return range.bitmask === size;
        }), function(range) {
            return range.bits.slice(0, range.bitmask);
        }).join("|") + ")");
    }));

    return function match(ip) {
        ip = parse(ip);
        for (var i = 0; i < rangeSizes.length; i++) {
            if (rangeSizes[i] === 0) {
                return true;
            }
            if (ip.bits.replace(indexedRanges[rangeSizes[i]], "").length !== IP_LENGTH) {
                return true;
            }
        }
        return false;
    }
}

module.exports = buildMatcher;