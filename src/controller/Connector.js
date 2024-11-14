import Core from "./core.js";
import UIView from "../view/uiView.js";

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

    static getShapeColor() {
        Core.View.setDrawingShapeType(shapeType);
    }

    static setToolbarForShape(shapeId) {
        const shape = this.getShapeById(shapeId);
        if (shape) {
            UIView.updateColorPickerForShape(shapeId, shape.fillcolor());
        }
    }

    static setToolbarForCanvas() {
        UIView.updateColorPickerForCanvas();
    }

}
