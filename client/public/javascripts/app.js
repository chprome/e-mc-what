;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var RectangleSurfaceView = require('./view/RectangleSurfaceView');

window.onload = function() {
    new RectangleSurfaceView();
};
},{"./view/RectangleSurfaceView":5}],2:[function(require,module,exports){
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
},{"../../lib/microee.js":6}],3:[function(require,module,exports){
function Formatter() {}

Formatter.number = function(number, separator) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

module.exports = Formatter;
},{}],4:[function(require,module,exports){
// ---- Constants

var ANIMATE_STEP = 20;
var RECTANGLE = {
    STROKE_COLOR: 'black',
    FILL_COLOR: '#e9e9ff'
};

// ---- Constructor

function RectangleSurfaceCanvasView(model) {
    this.model = model;
    
    this.dom = {
        canvas : document.getElementById('drawing')
    };

    this.currentDimensions = {
        width: this.model.width,
        height: this.model.height
    };

    this.targetDimensions = this.currentDimensions;

    this.steps = {
        width: 0,
        height: 0
    };

    this.model.on('change', this._onModelChange.bind(this));
    
    paper.setup(this.dom.canvas);
    paper.view.onFrame = this._onFrame.bind(this);
}

// ---- Privates Methods

RectangleSurfaceCanvasView.prototype._onFrame = function() {
    if(this._shallDraw()) {

        this._clearDrawing();

        this.currentDimensions.width = this._increment(this.currentDimensions.width, this.steps.width, this.targetDimensions.width);
        this.currentDimensions.height = this._increment(this.currentDimensions.height, this.steps.height, this.targetDimensions.height);

        var rectangle = new paper.Path.Rectangle(
            30, 30,
            this.currentDimensions.width+30, this.currentDimensions.height+30
        );

        rectangle.strokeColor = RECTANGLE.STROKE_COLOR;
        rectangle.fillColor = RECTANGLE.FILL_COLOR;
        paper.view.draw();
    }
};

RectangleSurfaceCanvasView.prototype._onModelChange = function() {
    this.targetDimensions = {
        width: this.model.width,
        height: this.model.height
    };

    this.steps = {
        width: (this.targetDimensions.width - this.currentDimensions.width)/ANIMATE_STEP,
        height: (this.targetDimensions.height - this.currentDimensions.height)/ANIMATE_STEP
    };
};

RectangleSurfaceCanvasView.prototype._clearDrawing = function() {
    if(paper.project.activeLayer.hasChildren()){
        paper.project.activeLayer.removeChildren();
    }
};

RectangleSurfaceCanvasView.prototype._shallDraw = function () {
    return this.currentDimensions.width !== this.targetDimensions.width 
        || this.currentDimensions.height !== this.targetDimensions.height;
};

RectangleSurfaceCanvasView.prototype._increment = function(value, step, limit) {
    value += step;
    if(step < 0) {
        value = Math.max(limit, value);
    } else {
        value = Math.min(limit, value);
    }
    return value;
};

module.exports = RectangleSurfaceCanvasView;
},{}],5:[function(require,module,exports){
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
    var surface = this.model.getSurface();
    if(isNaN(surface)) {
        this.dom.result.innerHTML = 'Veuillez saisir un nombre positif';
    }
    else {
        this.dom.result.innerHTML = Formatter.number(surface, ' ');
    }
};

// --- Privates Methods

RectangleSurfaceView.prototype._onWidthChange = function() {
    this.model.setWidth(this.dom.widthInput.value);
};

RectangleSurfaceView.prototype._onHeightChange = function() {
    this.model.setHeight(this.dom.heightInput.value);
};

module.exports = RectangleSurfaceView;
},{"../model/Rectangle":2,"../utils/Formatter":3,"./RectangleSurfaceCanvasView":4}],6:[function(require,module,exports){
function M() { this._events = {}; }
M.prototype = {
    on: function(ev, cb) {
        this._events || (this._events = {});
        var e = this._events;
        (e[ev] || (e[ev] = [])).push(cb);
        return this;
    },
    removeListener: function(ev, cb) {
        var e = this._events[ev] || [], i;
        for(i = e.length-1; i >= 0 && e[i]; i--){
            if(e[i] === cb || e[i].cb === cb) { e.splice(i, 1); }
        }
    },
    removeAllListeners: function(ev) {
        if(!ev) { this._events = {}; }
        else { this._events[ev] && (this._events[ev] = []); }
    },
    emit: function(ev) {
        this._events || (this._events = {});
        var args = Array.prototype.slice.call(arguments, 1), i, e = this._events[ev] || [];
        for(i = e.length-1; i >= 0 && e[i]; i--){
            e[i].apply(this, args);
        }
        return this;
    },
    when: function(ev, cb) {
        return this.once(ev, cb, true);
    },
    once: function(ev, cb, when) {
        if(!cb) return this;
        function c() {
            if(!when) this.removeListener(ev, c);
            if(cb.apply(this, arguments) && when) this.removeListener(ev, c);
        }
        c.cb = cb;
        this.on(ev, c);
        return this;
    }
};
M.mixin = function(dest) {
    var o = M.prototype, k;
    for (k in o) {
        o.hasOwnProperty(k) && (dest.prototype[k] = o[k]);
    }
};

module.exports = M;
},{}]},{},[1])
;