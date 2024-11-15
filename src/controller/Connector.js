import Core from "./core.js";
import UIView from "../view/uiView.js";

// UI <-> Core 간 통신모듈
export default class Connector {
    static getCanvas() {
        return Core.Model.getCanvas();
    }

    static getObjectById(id) {
        return Core.Model.getObjectById(id);
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

    static setAddingText() {
        Core.View.setAddingText();
    }

    static setToolbarForShape(shapeId) {
        const shape = this.getObjectById(shapeId);
        if (shape) {
            UIView.updateColorPickerForShape(shapeId, shape.fillcolor());
        }
    }

    static setToolbarForCanvas() {
        UIView.updateColorPickerForCanvas();
    }

}
