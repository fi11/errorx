var format = require('util').format;
var obj = require('obx');

module.exports = obj.create(Error).create(function ErrorX() {
    this.message = format.apply(this, arguments);
    this.name = this.__constructor.name || 'Error';

    Error.captureStackTrace(this, this.__constructor);
});
