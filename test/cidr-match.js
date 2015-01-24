var cidrMatcher = require('../lib/cidr-match');

var knownMatches = require('./data/cidr-match');

describe("The CIDR matcher", function() {
    it("is callable", function () {
        expect(cidrMatcher).to.be.a("function");
    });

    _.forEach(knownMatches, function (triplet) {
        it("returns true if the IP is in the provided ranges", function () {
            expect(cidrMatcher(triplet.input)(triplet.matchInput)).to.equal(triplet.output);
        });
    });
});