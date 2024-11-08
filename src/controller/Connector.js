import Core from "./core.js";

// UI <-> Core 간 통신모듈
export default class Connector {
    static getCanvas() {
        return Core.Model.getCanvas();
    }

    static getCanvasSize() {
        return Core.Model.getCanvasSizeValue();
    }
    
    static getCanvasColor() {
        return Core.Model.getCanvasColorValue();
    }

    static insertShape(shapeType, position) {
        Core.Model.insertNewShape(shapeType, position);
    }

    static setDrawingShapeType(shapeType) {
        Core.View.setDrawingShapeType(shapeType);
    }

}
