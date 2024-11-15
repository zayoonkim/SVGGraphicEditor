export default class Text {
    constructor(textData) {
        this.initializeProps(textData);
        this.listeners = [];
    }

    initializeProps(textData) {
        this._id = textData.id;
        this._content = textData.textContent;
        this._type = textData.type;
        this._fill = textData.font.fill;
        this._position = textData.transform.position; // x, y
        this._size = textData.transform.size; // width, height
        this._rotate = textData.transform.rotate;
        this._stroke = textData.font.stroke;
        this._fontFamily = textData.font.family;
        this._fontSize = textData.font.size;
        this._fontWeight = textData.font.weight;
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

    fill(newFill) {
        return newFill == null ? this._fill : (this._fill = newFill);
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

    rotate(newRotate) {
        return newRotate == null ? this._rotate : (this._rotate = newRotate);
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

    addListener(listener) {
        this.listeners.push(listener);
    }

    notifyListeners(changeType) {
        this.listeners.forEach((listener) => listener(changeType));
    }
}
