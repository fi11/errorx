var format = require('util').format;
var obj = require('obx');

var ErrorX = obj.create(Error).create(function ErrorX(arg1, arg2) {
    this.name = this.__constructor.name || 'Error';
    Error.captureStackTrace(this, this.__constructor);

    if (arg1 instanceof Error) {
        var args = [].slice.call(arguments);
        args.splice(0,1);

        this.__constructor._captureError.call(this, arg1, format.apply(this, args));

    } else {
        this.message = format.apply(this, arguments);
    }

});

ErrorX._captureError = function(err, msg) {
    var selfStack = this.stack.split('\n');
    var stack = err.stack.split('\n');

    var header = stack.splice(0, 1).join('');

    msg = format('%s [%s]', msg, header);

    this.message = msg;
    this.stack = [format('%s: %s', this.name, msg)].concat([selfStack[1]], stack).join('\n');
};

module.exports = ErrorX;
