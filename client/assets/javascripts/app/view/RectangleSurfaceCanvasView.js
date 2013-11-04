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