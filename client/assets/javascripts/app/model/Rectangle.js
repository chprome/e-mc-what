var MicroEE = require('../../lib/microee.js');

// --- Constructor

function Rectangle() {
    this.setWidth(0);
    this.setHeight(0);
}
MicroEE.mixin(Rectangle);


// --- Public Methods

Rectangle.prototype.setWidth = function(width) {
    this.width = this._parseFloat(width);
    this._computeSurface();
};

Rectangle.prototype.setHeight = function(height) {
    this.height = this._parseFloat(height);
    this._computeSurface();
};

Rectangle.prototype.getSurface = function() {
    return this.height * this.width;
};

// --- Privates Methods

Rectangle.prototype._computeSurface = function() {
    this.surface = this.height * this.width;
    this.emit('change', this.surface);
};

Rectangle.prototype._parseFloat = function(stringValue) {

    if(/^\d+(\.\d+)?$/.test(stringValue)) {
        var floatValue = parseFloat(stringValue, 10);
        return floatValue === 0.0 ? NaN : floatValue;
    }
 
    return NaN;
};


module.exports = Rectangle;