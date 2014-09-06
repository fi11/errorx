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
        var E1 = Err.create('SomeError');
        var E2 = Err.create(function SomeError() {
            Err.apply(this, arguments);
        });
        var E3 = Err.create(function SomeError() {
            Err.apply(this, arguments);
        });

        expect((new E1).name).to.eql('SomeError');
        expect((new E2).name).to.eql('SomeError');
        expect((new E2(new Error)).name).to.eql('SomeError');
    });

    it('Should have default name Error', function() {
        var E = Err.create(function() {
            Err.apply(this, arguments)
        });

        expect((new E).name).to.eql('Error');
    });

    it('Should have right message with both error', function() {
        var E = Err.create('SomeError');
        var err = new Error('ups');

        expect((new E(err, 'foo %s', 'bar')).message).to.eql('foo bar [Error: ups]');
    });

    it('Should have error stack of capture error', function() {
        var E = Err.create('SomeError');
        var err = new Error('ups');

        var stack = err.stack.split('\n');
        stack.splice(0, 1);

        var newError  = new E(err);

        var newErrorStack = newError.stack.split('\n');
        newErrorStack.splice(0, 2);

        expect(newErrorStack).to.eql(stack);
    });
});
