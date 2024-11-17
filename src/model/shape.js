export default class Shape {
    constructor(shapeData) {
        this.initializeProps(shapeData);
        this.listeners = [];
    }

    initializeProps(shapeData) {
        this._id = shapeData.id;
        this._type = shapeData.type;
        this._stroke = shapeData.stroke; // color, width
        this._fillcolor = shapeData.fill.color;
        this._fillOpacity = shapeData.fill.opacity;
        this._position = shapeData.transform.position; // x,y
        this._size = shapeData.transform.size; // width, height
        this._rotation = shapeData.transform.rotation;
        this._alignment = shapeData.alignment;
    }
  
    // getter - setters

    getId() {
        return this._id;
    }

    getType() {
        return this._type;
    }

    stroke(newStroke) {
        return newStroke == null ? this._stroke : (this._stroke = newStroke);
    }

    fillcolor(newFillColor) {
        return newFillColor == null ? this._fillcolor : (this._fillcolor = newFillColor);
    }

    fillOpacity(newFillOpacity) {
        return newFillOpacity == null ? this._fillOpacity : (this._fillOpacity = newFillOpacity);
    }

    position(newPosition) {
        return newPosition == null ? this._position : (this._position = newPosition);
    }

    size(newSize) {
        return newSize == null ? this._size : (this._size = newSize);
    }

    rotation(newRotation) {
        return newRotation == null ? this._rotation : (this._rotation = newRotation);
    }

    alignment(newAlignment) {
        return newAlignment == null ? this._alignment : (this._alignment = newAlignment);
    }

    updatePosition(newPosition) {
        this.position(newPosition);
        this.notifyListeners("position");
    }

    updateColor(newFillColor) {
        this.fillcolor(newFillColor);
        this.notifyListeners("color");
    }
    
    resizeShape(newSize, newPosition) {
        this.position(newPosition);
        this.size(newSize)
        this.notifyListeners("size");
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    notifyListeners(changeType) {
        this.listeners.forEach((listener) => listener(changeType));
    }
}

