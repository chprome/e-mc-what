var Rectangle = require('../model/Rectangle');
var Formatter = require('../utils/Formatter');
var RectangleSurfaceCanvasView = require('./RectangleSurfaceCanvasView');

function RectangleSurfaceView() {
    this.model = new Rectangle();
    new RectangleSurfaceCanvasView(this.model);
    this.dom = {
        widthInput : document.getElementById('width'),
        heightInput : document.getElementById('height'),
        result : document.getElementById('result')
    };
    this.bindEvents();
}

// --- Public Methods

RectangleSurfaceView.prototype.bindEvents = function bindEvents() {
    this.dom.widthInput.addEventListener('change', this._onWidthChange.bind(this));
    this.dom.heightInput.addEventListener('change', this._onHeightChange.bind(this));
    this.model.on('change', this.render.bind(this));
};

RectangleSurfaceView.prototype.render = function() {
    document.getElementById('result').innerHTML = Formatter.number(this.model.getSurface(), ' ');
};

// --- Privates Methods

RectangleSurfaceView.prototype._onWidthChange = function() {
    this.model.setWidth(this.dom.widthInput.value);
};

RectangleSurfaceView.prototype._onHeightChange = function() {
    this.model.setHeight(this.dom.heightInput.value);
};

module.exports = RectangleSurfaceView;