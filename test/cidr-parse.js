var cidrParse = require('../lib/cidr-parse');

var knownCidr = require('./data/cidr-parse');

describe("The CIDR/IP parser", function () {
    it("is callable", function () {
        expect(cidrParse).to.be.a("function");
    });

    _.forEach(knownCidr, function (pair) {
        it("returns an object with the proper IP, netmask, and binary representations", function () {
            expect(cidrParse(pair.input)).to.deep.equal(pair.output);
        });
    });
});