var main = require('../index.js');

var data = require('./data/main');

describe("The real ip finding middleware", function(){
    it("is configurable", function(){
        expect(main).to.be.a("function");
    });
    it("returns middleware", function(){
        expect(main(true)).to.be.a("function");
    });
    it("returns middleware", function(){
        expect(main([])).to.be.a("function");
    });

    _.forEach(data, function(data) {
        it("returns the proper ip", function(done) {
            var middleware = main(data.setup);
            var req = data.req;
            function middlewareDone() {
                try {
                    expect(req.ip).to.equal(data.result);
                } catch (e) {
                    return done(e);
                }
                done();
            }
            middleware(req, {}, middlewareDone);
        });
    })
});