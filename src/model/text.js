export default class Text {
    constructor(textData) {
        this.initializeProps(textData);
        this.listeners = [];
    }

    initializeProps(textData) {
        this._id = textData.id;
        this._content = textData.textContent;
        this._type = textData.type;
        this._fillColor = textData.fill;
        this._position = textData.position; // x, y
        this._size = textData.size; // width, height
        this._rotate = textData.rotate;
        this._stroke = textData.font?.stroke;
        this._fontFamily = textData.font?.family;
        this._fontSize = textData.font?.size;
        this._fontWeight = textData.font?.weight;
        this._alignment = textData.alignment;
    }

    getId() {
        return this._id;
    }

    getType() {
        return this._type;
    }

    content(newContent) {
        return newContent == null ? this._content : (this._content = newContent);
    }

    fillColor(newFill) {
        return newFill == null ? this._fillColor : (this._fillColor = newFill);
    }

    stroke(newStroke) {
        return newStroke == null ? this._stroke : (this._stroke = newStroke);
    }

    position(newPosition) {
        return newPosition == null ? this._position : (this._position = newPosition);
    }

    size(newSize) {
        return newSize == null ? this._size : (this._size = newSize);
    }

    fontFamily(newFontFamily) {
        return newFontFamily == null ? this._fontFamily : (this._fontFamily = newFontFamily);
    }

    fontSize(newFontSize) {
        return newFontSize == null ? this._fontSize : (this._fontSize = newFontSize);
    }

    fontWeight(newFontStyle) {
        return newFontStyle == null ? this._fontWeight : (this._fontWeight = newFontStyle);
    }

    fontColor(newFontColor) {
        return newFontColor == null ? this._fontColor : (this._fontColor = newFontColor);
    }

    alignment(newAlignment) {
        return newAlignment == null ? this._alignment : (this._alignment = newAlignment);
    }

    updateContent(newContent) {
        this.content(newContent);
        this.notifyListeners("content");
    }

    updatePosition(newPosition) {
        this.position(newPosition);
        this.notifyListeners("position");
    }
    
    updateColor(newColor) {
        this.fillcolor(newColor);
        this.notifyListeners("color");
    }
    
    updateSize(newSize) {
        this.fontSize(newSize);
        this.notifyListeners("size");
    }

    updateColor(newColor) {
        this.fillColor(newColor);
        this.notifyListeners("color");
    }

    updateSize(newSize) {
        this.fontSize(newSize);
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
            textContent: this._content,
            type: this._type,
            fill: this._fillColor, 
            position: this._position,
            size: this._size,
            rotate: this._rotate,
            font: {
                stroke: this._stroke ,
                family: this._fontFamily,
                size: this._fontSize, 
                weight: this._fontWeight, 
            },
            alignment: this._alignment,
        };
    }
}
