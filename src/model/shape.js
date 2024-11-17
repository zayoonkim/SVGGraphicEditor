export default class Shape {
    constructor(shapeData) {
        this.initializeProps(shapeData);
        this.listeners = [];
    }

    initializeProps(shapeData) {
        this._id = shapeData.id;
        this._type = shapeData.type;
        this._stroke = shapeData.stroke; // color, width
        this._fillColor = shapeData.fill?.color;
        this._fillOpacity = shapeData.fill?.opacity;
        this._position = shapeData.position; // x,y
        this._size = shapeData.size; // width, height
        this._rotation = shapeData.rotation;
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

    fillColor(newFillColor) {
        return newFillColor == null ? this._fillColor : (this._fillColor = newFillColor);
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
        this.fillColor(newFillColor);
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

    getExportData() {
        return {
            id: this._id,
            type: this._type,
            stroke: this._stroke,
            fill: {
                color: this._fillColor,
                opacity: this._fillOpacity,
            },
            position: this._position,
            size: this._size,
            rotation: this._rotation,
            alignment: this._alignment,
        };
    }
}

