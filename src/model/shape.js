import Connector from "../controller/Connector.js";
import Selector from "../controller/selector.js";

export default class Shape {
    constructor(shapeData) {
        this.initializeProps(shapeData);
    }

    initializeProps(shapeData) {
        this.type(shapeData.type);
        this.id(shapeData.id);
        this.stroke(shapeData.stroke); // color, width
        this.fillcolor(shapeData.fill.color);
        this.fillopacity(shapeData.fill.opacity);
        this.position(shapeData.transform.position); // x,y
        this.size(shapeData.transform.size); // width, height
        this.rotation(shapeData.transform.rotation);
        this.alignment(shapeData.alignment);
    }
    updateShapeColor(newFillColor) {
        this.fillcolor(newFillColor);
    }
    type(newType) {
        return newType == null ? this.type : (this.type = newType);
    }

    id(newId) {
        return newId == null ? this.id : (this.id = newId);
    }

    stroke(newStroke) {
        return newStroke == null ? this.stroke : (this.stroke = newStroke);
    }

    fillcolor(newFillColor) {
        return newFillColor == null ? this.fillcolor : (this.fillcolor = newFillColor);
    }

    fillopacity(newFillOpacity) {
        return newFillOpacity == null ? this.fillopacity : (this.fillopacity = newFillOpacity);
    }

    position(newPosition) {
        return newPosition == null ? this.position : (this.position = newPosition);
    }

    size(newSize) {
        return newSize == null ? this.size : (this.size = newSize);
    }

    rotation(newRotation) {
        return newRotation == null ? this.rotation : (this.rotation = newRotation);
    }

    alignment(newAlignment) {
        return newAlignment == null ? this.alignment : (this.alignment = newAlignment);
    }

    updateShapePosition(id, newPosition) {
        Connector.notifyShapeUpdate(id); // Shape의 위치가 변경되었음을 알림
    }
}

