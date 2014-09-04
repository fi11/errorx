var expect = require('chai').expect;
var Err = require('../index.js');


describe('ErrorX', function() {
    it('Should be instance of Error', function() {
        expect(new Err).to.be.instanceOf(Error);
    });
    
    it('Should have create static method', function() {
        expect(Err.create).to.exist;
    });

    it('Should have format message', function() {
        expect((new Err('foo %s', 'bar').message)).to.eql('foo bar');
    });
    
    it('Should right name', function() {
        var E = Err.create('SomeError');
        expect((new E).name).to.eql('SomeError');
    });

    it('Should have default name Error', function() {
        var E = Err.create(function() {
            Err.apply(this, arguments)
        });

        expect((new E).name).to.eql('Error');
    });
});
