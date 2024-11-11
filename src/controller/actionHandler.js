import Connector from "./Connector.js";

  export default class ActionHandler {
    static updateCanvasColor(op) {
        Connector.getCanvas().updateColor(op.value);
        
    }
    static updateCanvasSize(op) {
        Connector.getCanvas().updateSize(op.width, op.height);
    }

    // TODO : 도형 update
    static updateShapeColor(op) {
        // Connector.getCanvas.updateShapeColor(op.value);
    }

    static updateShapePosition(op) {
        Connector.getShapeById(op.shapeId).updateShapePosition(op.shapeId, op.newPosition);
    }

    static insertShape(op) {
        Connector.getCanvas().addShapeModel(op.shapeType, op.position);
    }

    static deleteShape(op) {
        Connector.getCanvas().deleteShapeModel(op.shapeId);
    }
}
