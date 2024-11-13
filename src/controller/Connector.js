import Core from "./core.js";

// UI <-> Core 간 통신모듈
export default class Connector {
    static getCanvas() {
        return Core.Model.getCanvas();
    }

    static getShapeById(id) {
        return Core.Model.getShapeById(id);
    }

    static getCanvasSize() {
        return Core.Model.getCanvasSizeValue();
    }
    
    static getCanvasColor() {
        return Core.Model.getCanvasColorValue();
    }

    static setDrawingShapeType(shapeType) {
        Core.View.setDrawingShapeType(shapeType);
    }

    // ShapeModel <-> View
    static notifyShapeUpdate(shapeId) {
        Core.View.updateShapePosition(shapeId);
    }
}
