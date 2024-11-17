import Connector from "./Connector.js";

  export default class ActionHandler {
    // canvas

    static updateCanvasColor(op) {
        Connector.getCanvas().updateColor(op.value);
    }

    static updateCanvasSize(op) {
        Connector.getCanvas().updateSize(op.width, op.height);
    }

    //shape

    static updateShapeColor(op) {
        Connector.getObjectById(op.shapeId).updateColor(op.newColor);
    }

    static updateShapePosition(op) {
        Connector.getObjectById(op.shapeId).updatePosition(op.newPosition);
    }

    static resizeShape(op) {
        Connector.getObjectById(op.shapeId).resizeShape(op.newSize, op.newPosition);
    }

    static insertShape(op) {
        Connector.getCanvas().addShapeModel(op.shapeType, op.position);
    }

    static deleteShape(op) {
        Connector.getCanvas().deleteShapeModel(op.shapeId);
    }

    // text
    
    static insertText(op) {
        Connector.getCanvas().addTextModel(op.textValue, op.textPosition);
    }

    static moveText(op) {
        Connector.getObjectById(op.textId).updatePosition(op.newPosition);
    }

    static editText(op) {
        Connector.getObjectById(op.textId).updateContent(op.newText);
    }

    static updateTextColor(op) {
        Connector.getObjectById(op.textId).updateColor(op.newColor);
    }

    static updateTextSize(op) {
        Connector.getObjectById(op.textId).updateSize(op.newSize);
    }
}
