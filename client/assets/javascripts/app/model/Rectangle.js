var MicroEE = require('../../lib/microee.js');

// --- Constructor

function Rectangle() {
    this.setWidth(0);
    this.setHeight(0);
}
MicroEE.mixin(Rectangle);


// --- Public Methods

Rectangle.prototype.setWidth = function(width) {
    // TODO : valider le paramètre
    this.width = parseFloat(width, 10);
    this._computeSurface();
};

Rectangle.prototype.setHeight = function(height) {
    // TODO : valider le paramètre
    this.height = parseFloat(height, 10);
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


module.exports = Rectangle;